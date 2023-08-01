// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/ERC20.interface.sol";

contract ERC20Token is ERC20Interface {
    constructor() ERC20Interface("MyERC20Token", "MY20", 1){

    }
}
