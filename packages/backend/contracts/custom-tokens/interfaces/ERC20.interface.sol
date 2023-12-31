// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC20Interface {
    string public name;
    string public symbol;
    uint256 public totalSupply;

    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) private allowed;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        uint8 decimals = 18; // quintillion
        totalSupply = initialSupply * 10 ** uint256(decimals);
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address _owner) external view returns (uint256) {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) external returns (bool) {
        require(_to != address(0), "ERC20: Invalid address");
        require(_value <= balances[msg.sender], "ERC20: Insufficient balance");

        balances[msg.sender] -= _value;
        balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool) {
        require(_from != address(0), "ERC20: Invalid address");
        require(_to != address(0), "ERC20: Invalid address");
        require(_value <= balances[_from], "ERC20: Insufficient balance");
        require(
            _value <= allowed[_from][msg.sender],
            "ERC20: Allowance exceeded"
        );

        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) external returns (bool) {
        require(_spender != address(0), "ERC20: Invalid address");

        allowed[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(
        address _owner,
        address _spender
    ) external view returns (uint256) {
        return allowed[_owner][_spender];
    }

}
