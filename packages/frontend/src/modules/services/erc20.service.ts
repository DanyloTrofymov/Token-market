import { Contract } from 'ethers';
import { Connection } from './connection.service';
import ERC20Contract from '../../ABI/custom-tokens/ERC20.contract.sol/ERC20Token.json';

class ERC20Token {
  ERC20Token: Contract;

  constructor() {
    this.ERC20Token = Connection(process.env.REACT_APP_ERC20_ADDRESS || '', ERC20Contract.abi);
  }

  setAllowance = async (amount: number) => {
    const tx = await this.ERC20Token.approve(process.env.REACT_APP_MARKET_ADDRESS, amount);
    await tx.wait();
  };
}

export const ERC20TokenService = new ERC20Token();
