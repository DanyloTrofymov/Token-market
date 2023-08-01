// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/ERC721.interface.sol";

contract ERC721Token is ERC721Interface {
    constructor() ERC721Interface("MyERC721Token", "MY721" ){

    }
}
