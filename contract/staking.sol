pragma solidity ^0.8.11;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Context.sol";

interface Token {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (uint256);    
}

contract StakeAPL is Pausable, Ownable, ReentrancyGuard {

    Token aplToken;

    // 1 Days (1 * 24 * 60 * 60)
    uint256 public planDuration = 86400;


    uint8 public interestRate = 10;
    uint8 public totalStakers;

    struct StakeInfo {        
        uint256 startTS;
        uint256 endTS;        
        uint256 amount; 
        uint256 claimed;       
    }
    
    event Staked(address indexed from, uint256 amount);
    event Claimed(address indexed from, uint256 amount);
    
    mapping(address => StakeInfo) public stakeInfos;
    mapping(address => bool) public addressStaked;


    constructor(Token _tokenAddress) {
        require(address(_tokenAddress) != address(0),"Token Address cannot be address 0");                
        aplToken = _tokenAddress;        
        totalStakers = 0;
    }    

    function transferToken(address to,uint256 amount) external onlyOwner{
        require(aplToken.transfer(to, amount), "Token transfer failed!");  
    }

    function claimReward() external returns (bool){
        require(addressStaked[_msgSender()] == true, "You are not participated");
        require(stakeInfos[_msgSender()].endTS < block.timestamp, "Stake Time is not over yet");
        require(stakeInfos[_msgSender()].claimed == 0, "Already claimed");

        uint256 stakeAmount = stakeInfos[_msgSender()].amount;
        uint256 totalTokens = stakeAmount + (stakeAmount * interestRate / 100);
        stakeInfos[_msgSender()].claimed == totalTokens;
        aplToken.transfer(_msgSender(), totalTokens);

        emit Claimed(_msgSender(), totalTokens);

        return true;
    }

    function cancleStake() external returns (bool){
        require(addressStaked[_msgSender()] == true, "You are not participated");
        require(stakeInfos[_msgSender()].amount > 0, "Yo cant cancle with over amount");

        uint256 stakeAmount = stakeInfos[_msgSender()].amount;
        uint256 totalTokens = stakeAmount;
        stakeInfos[_msgSender()].claimed == totalTokens;
        uint256 backTokens = totalTokens * 90/100;
        aplToken.transfer(_msgSender(), backTokens);
        totalStakers--;
        addressStaked[_msgSender()] = false;
        delete stakeInfos[_msgSender()];

        emit Claimed(_msgSender(), totalTokens);

        return true;
    }

    function getTokenExpiry() external view returns (uint256) {
        require(addressStaked[_msgSender()] == true, "You are not participated");
        return stakeInfos[_msgSender()].endTS;
    }

    function stakeToken(uint256 stakeAmount) external payable whenNotPaused {
        require(stakeAmount >0, "Stake amount should be correct");
        require(aplToken.balanceOf(_msgSender()) >= stakeAmount, "Insufficient Balance");
        aplToken.transferFrom(_msgSender(), address(this), stakeAmount);
        if(addressStaked[_msgSender()] == false){
            totalStakers++;
            addressStaked[_msgSender()] = true;

            stakeInfos[_msgSender()] = StakeInfo({                
                startTS: block.timestamp,
                endTS: block.timestamp + planDuration,
                amount: stakeAmount,
                claimed: 0
            });
        }else{
            stakeInfos[_msgSender()].amount += stakeAmount;
        }
           
        
        emit Staked(_msgSender(), stakeAmount);
    }




    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}