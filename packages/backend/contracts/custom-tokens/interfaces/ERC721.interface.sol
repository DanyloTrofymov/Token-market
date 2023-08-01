// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721Interface {
    string public name;
    string public symbol;
    uint256 private totalSupply;

    struct TokenData {
        string tokenURI;
    }

    mapping(address => uint256[]) private ownedTokens;
    mapping(uint256 => address) private tokenOwners;
    mapping(uint256 => uint256) private tokenIndexes;
    mapping(uint256 => address) private tokenApprovals;
    mapping(address => mapping(address => uint256)) private allowed;
    mapping(uint256 => TokenData) private tokenData;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event URI(string _value, uint256 indexed _id);

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function balanceOf(address owner) public view returns (uint256[] memory) {
        require(owner != address(0), "ERC721: Invalid address");
        return ownedTokens[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = tokenOwners[tokenId];
        require(owner != address(0), "ERC721: Token does not exist");
        return owner;
    }

    function mint(address to, uint256 tokenId, string memory tokenURI) public {
        require(to != address(0), "ERC721: Invalid address");
        require(tokenOwners[tokenId] == address(0), "ERC721: Token already exists");

        tokenOwners[tokenId] = to;
        ownedTokens[to].push(tokenId);
        totalSupply++;
        tokenIndexes[tokenId] = ownedTokens[to].length - 1;
        tokenData[tokenId] = TokenData(tokenURI);

        emit Transfer(address(0), to, tokenId);
        emit URI(tokenURI, tokenId);
    }

    function getTokenURI(uint256 tokenId) external view returns (string memory) {
        require(tokenOwners[tokenId] != address(0), "ERC721: Token does not exist");
        return tokenData[tokenId].tokenURI;
    }

    function transfer(address to, uint256 tokenId) external {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "ERC721: You are not the owner");
        require(to != address(0), "ERC721: Invalid address");

        uint256 tokenIndex = tokenIndexes[tokenId];
        uint256[] storage senderTokens = ownedTokens[msg.sender];
        require(senderTokens[tokenIndex] == tokenId, "ERC721: Token not found");
        senderTokens[tokenIndex] = senderTokens[senderTokens.length - 1];
        senderTokens.pop();
        delete tokenIndexes[tokenId];

        tokenOwners[tokenId] = to;
        ownedTokens[to].push(tokenId);
        tokenIndexes[tokenId] = ownedTokens[to].length - 1;

        emit Transfer(msg.sender, to, tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) external {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner || getApproved(tokenId) == msg.sender || allowed[from][msg.sender] >= 1, "ERC721: Allowance exceeded");
        require(owner == from, "ERC721: Token not owned by 'from'");
        require(to != address(0), "ERC721: Invalid address");

        uint256 tokenIndex = tokenIndexes[tokenId];
        uint256[] storage senderTokens = ownedTokens[from];
        require(senderTokens[tokenIndex] == tokenId, "ERC721: Token not found");
        senderTokens[tokenIndex] = senderTokens[senderTokens.length - 1];
        senderTokens.pop();
        delete tokenIndexes[tokenId];

        tokenOwners[tokenId] = to;
        ownedTokens[to].push(tokenId);
        tokenIndexes[tokenId] = ownedTokens[to].length - 1;

        emit Transfer(from, to, tokenId);
    }

    function approve(address to, uint256 tokenId) external {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "ERC721: You are not allowed to approve");

        tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return allowed[owner][spender];
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        return tokenApprovals[tokenId];
    }
}