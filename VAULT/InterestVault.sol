// SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;
contract Vault{
    constructor () payable{
        require(msg.value>0,"SEND ETH ");
     }
    mapping (address => uint256) private s_getAddressToAmountFunded;
    mapping (address => uint256) private lastTimeFunded;

    address[] public s_funders;
    
    mapping(address => bool) private s_isFunder;

    uint256 public constant rate=1e7;
    uint256 public constant MAX_TIME=30 days;
    uint256 public constant MAX_INTEREST_PERCENT=50;

    event funding (address indexed user, uint256 amount);
 
    error Vault__NotEnoughEthSent();
    error Vault__WithdrawFailure();
    error Vault__CannotWithdraw();
    error Vault__VaultInsolvent();

    function seedVault() external payable{
        require(msg.value>0, "SEND ENOUGH ETH");
    }


    function fund() public payable  {
        if (msg.value > 0){
            s_getAddressToAmountFunded[msg.sender]+= msg.value;
                if (!s_isFunder[msg.sender]) {
              s_funders.push(msg.sender);
               s_isFunder[msg.sender] = true;
                }
            lastTimeFunded[msg.sender]=block.timestamp;
            emit funding(msg.sender,msg.value); 
        }
        else{
              revert Vault__NotEnoughEthSent();
        }
        
    } 
    function calculateInterestRate(address user) public view returns (uint256) {
       uint256  totalTime=block.timestamp-lastTimeFunded[user];
       if(totalTime>MAX_TIME){
        totalTime=MAX_TIME;
       }
       uint256  interestAmount=((s_getAddressToAmountFunded[user])*rate*totalTime)/(1e18);
       uint256 principal= s_getAddressToAmountFunded[user];
       if(principal==0) 
       {
       return 0;
       }
        uint256 maxInterest =(principal*MAX_INTEREST_PERCENT)/100;
        if(interestAmount >maxInterest){
            interestAmount= maxInterest;
        }
        return interestAmount;
    }
    function withdraw() public {
        uint256 principal;
        principal= s_getAddressToAmountFunded[msg.sender];
     if(principal == 0){
           revert Vault__CannotWithdraw();
     }
     uint256 interest=calculateInterestRate(msg.sender);
     uint256 totalAmount=interest+principal;
     if(address(this).balance < totalAmount){
        revert Vault__VaultInsolvent();
     }

      s_getAddressToAmountFunded[msg.sender] = 0;
    lastTimeFunded[msg.sender] = block.timestamp;
   (bool success,)= payable(msg.sender).call{value:totalAmount}("");
   if(!success)
   revert Vault__WithdrawFailure();
    }
    function getAddressToAmountFunded(address funder) external view returns (uint256){
       return s_getAddressToAmountFunded[funder];
    }
    function getFunders(uint256 index) external view returns(address){
        return s_funders[index];
    }

receive () external payable{
fund();
}

}

