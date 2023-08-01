// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../custom-tokens/ERC20.contract.sol";
import "../custom-tokens/ERC721.contract.sol";
import "../custom-tokens/ERC1155.contract.sol";

contract Market {
    ERC20Token private erc20TokenContract;
    ERC721Token private erc721TokenContract;
    ERC1155Token private erc1155TokenContract;

    constructor(
        address _erc20TokenContractAddress,
        address _erc721TokenContractAddress,
        address _erc1155TokenContractAddress
    ) {
        erc20TokenContract = ERC20Token(_erc20TokenContractAddress);
        erc721TokenContract = ERC721Token(_erc721TokenContractAddress);
        erc1155TokenContract = ERC1155Token(_erc1155TokenContractAddress);
    }

    event Transfer(address indexed from, address indexed to, uint256 value);

    function buyERC20Tokens() external payable {
        require(msg.value > 0, "ETH amount must be greater than 0");

        uint256 rate = 1 gwei; // 1 gwei is 1 token

        uint256 tokensToBuy = msg.value / rate;

        require(
            erc20TokenContract.balanceOf(address(this)) >= tokensToBuy,
            "Insufficient tokens in the market"
        );

        require(
            erc20TokenContract.transfer(msg.sender, tokensToBuy),
            "Token transfer failed"
        );

        emit Transfer(msg.sender, address(this), msg.value);
    }

    function getMarketBalance() external view returns (uint256) {
        return erc20TokenContract.balanceOf(address(this));
    }

    function createERC721Token(
        string memory tokenURI
    ) external returns (uint256) {
        uint256 erc20TokensRequired = 100;
        require(
            erc20TokenContract.balanceOf(msg.sender) >= erc20TokensRequired,
            "Insufficient ERC20 tokens"
        );

        require(
            erc20TokenContract.transferFrom(
                msg.sender,
                address(this),
                erc20TokensRequired
            ),
            "Transfer of ERC20 tokens failed"
        );

        uint256 tokenId = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        erc721TokenContract.mint(msg.sender, tokenId, tokenURI);
        return tokenId;
    }

    function createERC1155Token(
        string memory tokenURI,
        uint256 amount
    ) external returns (uint256) {
        uint256 erc20TokensRequired = 100;

        require(
            erc20TokenContract.balanceOf(msg.sender) >= erc20TokensRequired,
            "Insufficient ERC20 tokens"
        );
        require(
            erc20TokenContract.transferFrom(
                msg.sender,
                address(this),
                erc20TokensRequired
            ),
            "Transfer of ERC20 tokens failed"
        );

        uint256 tokenId = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        erc1155TokenContract._mint(msg.sender, tokenId, amount, tokenURI);
        return tokenId;
    }

    function withdrawExcessTokens() external {
        require(
            msg.sender == owner(),
            "Only the contract owner can call this function"
        );

        uint256 excessTokens = erc20TokenContract.balanceOf(address(this));
        require(excessTokens > 0, "No excess tokens to withdraw");

        require(
            erc20TokenContract.transfer(msg.sender, excessTokens),
            "Token transfer failed"
        );
    }

    function withdrawEther() external {
        require(
            msg.sender == owner(),
            "Only the contract owner can call this function"
        );

        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");

        address payable ownerAddress = payable(owner());
        ownerAddress.transfer(balance);
    }

    function owner() internal pure returns (address) {
        return 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    }

    function getERC20Balance() external view returns (uint256) {
        return erc20TokenContract.balanceOf(address(msg.sender));
    }

    function getERC721Balance() external view returns (uint256[] memory) {
        return erc721TokenContract.balanceOf(address(msg.sender));
    }

    function getERC1155Balance() external view returns (uint256) {
        return erc1155TokenContract.getOwnedTokenCount(address(msg.sender));
    }
}
