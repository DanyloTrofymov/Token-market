// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC1155Interface {
    string public name;
    string public symbol;
    uint256 private totalSupply;

    struct TokenData {
        string tokenURI;
    }

    mapping(address => mapping(uint256 => uint256)) private balances;
    mapping(address => mapping(uint256 => mapping(address => uint256)))
        private allowances;
    mapping(uint256 => address) private tokenCreators;
    mapping(uint256 => TokenData) private tokenData;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId,
        uint256 amount
    );
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _id,
        uint256 _amount
    );
    event URI(string _value, uint256 indexed _id);

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function balanceOf(
        address owner,
        uint256 tokenId
    ) public view returns (uint256) {
        return balances[owner][tokenId];
    }

    function _mint(
        address to,
        uint256 tokenId,
        uint256 amount,
        string memory tokenURI
    ) public {
        require(to != address(0), "ERC1155: Invalid address");
        require(
            tokenCreators[tokenId] == address(0),
            "ERC1155: Token already exists"
        );

        tokenCreators[tokenId] = msg.sender;
        balances[to][tokenId] = amount;
        totalSupply += amount;
        tokenData[tokenId] = TokenData(tokenURI); // Store the token data

        emit Transfer(msg.sender, to, tokenId, amount);
        emit URI(tokenURI, tokenId);
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        require(
            tokenCreators[tokenId] != address(0),
            "ERC1155: Token does not exist"
        );
        return tokenData[tokenId].tokenURI;
    }

    function transfer(address to, uint256 tokenId, uint256 amount) external {
        address owner = tokenCreators[tokenId];
        require(owner != address(0), "ERC1155: Token does not exist");
        require(to != address(0), "ERC1155: Invalid address");
        require(
            balances[msg.sender][tokenId] >= amount,
            "ERC1155: Insufficient balance"
        );

        balances[msg.sender][tokenId] -= amount;
        balances[to][tokenId] += amount;

        emit Transfer(msg.sender, to, tokenId, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId,
        uint256 amount
    ) external {
        address owner = tokenCreators[tokenId];
        require(owner != address(0), "ERC1155: Token does not exist");
        require(to != address(0), "ERC1155: Invalid address");
        require(
            balances[from][tokenId] >= amount,
            "ERC1155: Insufficient balance"
        );
        require(
            allowances[from][tokenId][msg.sender] >= amount,
            "ERC1155: Allowance exceeded"
        );

        balances[from][tokenId] -= amount;
        balances[to][tokenId] += amount;
        allowances[from][tokenId][msg.sender] -= amount;

        emit Transfer(from, to, tokenId, amount);
    }

    function approve(
        address spender,
        uint256 tokenId,
        uint256 amount
    ) external {
        address owner = tokenCreators[tokenId];
        require(owner != address(0), "ERC1155: Token does not exist");
        require(spender != address(0), "ERC1155: Invalid address");

        allowances[msg.sender][tokenId][spender] = amount;

        emit Approval(msg.sender, spender, tokenId, amount);
    }

    function allowance(
        address owner,
        address spender,
        uint256 tokenId
    ) external view returns (uint256) {
        return allowances[owner][tokenId][spender];
    }
}
