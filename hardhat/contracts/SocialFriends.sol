//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract SocialFriends is ERC20, ERC20Burnable, Ownable{
    // mapping(address => bool) public auditors;
    address private auditor;
    uint8 private DECIMALS;
    constructor() 
    Ownable(msg.sender) 
    ERC20("SocialFrineds", "SFRND")
    {
        // auditors[auditor]= true;
        DECIMALS = 8;
    }
    modifier onlyAuditor(){
        require(msg.sender == auditor, "Only auditor's contract allow to perform this action!");
        _;
    }

    function decimals() public view virtual override returns (uint8) {
        return DECIMALS;
    }
    function getAuditor() public view returns (address){
        return auditor;
    }
    function assignAuditor(address _auditor) external onlyOwner{
        require(auditor == address(0), "auditor's contract alreay exist!");
        auditor = _auditor;
    }

    function changeAuditor(address _auditor) external  onlyOwner{
        auditor = _auditor;
    }

    function mint(address _to, uint256 _value) external  onlyAuditor{
        _mint(_to, _value); 
    }   
}