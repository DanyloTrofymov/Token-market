import { Contract } from 'ethers';
import { Connection } from './connection.service';
import MarketContract from '../../ABI/market.contract.sol/Market.json';

export class Market {
  market: Contract;

  constructor() {
    this.market = Connection(process.env.REACT_APP_MARKET_ADDRESS || '', MarketContract.abi);
  }

  buyERC20token = async (amount: string) => {
    try {
      const tx = await this.market.buyERC20token(amount);
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };

  getMarketBalance = async () => {
    try {
      const balance = await this.market.getMarketBalance();
      return balance;
    } catch (err) {
      console.log(err);
    }
  };

  createERC721token = async (tokenURI: string) => {
    try {
      const tx = await this.market.createERC721token(tokenURI);
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };

  createERC1155token = async (amount: string) => {
    try {
      const tx = await this.market.createERC1155token(amount);
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };

  getERC20balance = async (tokenId: string) => {
    try {
      const balance = await this.market.getERC20balance(tokenId);
      return balance;
    } catch (err) {
      console.log(err);
    }
  };

  getERC721balance = async (tokenId: string) => {
    try {
      const balance = await this.market.getERC721balance(tokenId);
      return balance;
    } catch (err) {
      console.log(err);
    }
  };

  getERC1155balance = async (tokenId: string) => {
    try {
      const balance = await this.market.getERC1155balance(tokenId);
      return balance;
    } catch (err) {
      console.log(err);
    }
  };
}
