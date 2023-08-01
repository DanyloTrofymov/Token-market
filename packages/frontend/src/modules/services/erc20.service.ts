import { Contract } from 'ethers';
import { Connection } from './connection.service';
import ERC20Contract from '../../ABI/custom-tokens/ERC20.contract.sol/ERC20Token.json';

export class ERC20Token {
  ERC20Token: Contract;

  constructor() {
    this.ERC20Token = Connection(process.env.REACT_APP_ERC20_ADDRESS || '', ERC20Contract.abi);
  }

  setAllowance = async (amount: string) => {
    try {
      const tx = await this.ERC20Token.approve(amount, process.env.REACT_APP_MARKET_ADDRESS);
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };
}
