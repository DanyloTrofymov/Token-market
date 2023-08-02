// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/ERC1155.interface.sol";

contract ERC1155Token is ERC1155Interface {
    constructor() ERC1155Interface("MyERC1155Token", "MY1155") {}
}
