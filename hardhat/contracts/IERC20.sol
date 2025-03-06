// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function mint(address to, uint256 value) external ;  
    function assignAuditor(address auditor) external;
    function changeAuditor(address auditor) external;  
}