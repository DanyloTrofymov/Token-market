import { Contract } from 'ethers';
import { Connection } from './connection.service';
import MarketContract from '../../ABI/markets/market.contract.sol/Market.json';
import { Create1155 } from '../common/types';

class Market {
  market: Contract;

  constructor() {
    this.market = Connection(process.env.REACT_APP_MARKET_ADDRESS || '', MarketContract.abi);
  }

  handleTransaction = async (promise: Promise<any>) => {
    const tx = await promise;
    await tx.wait();
  };

  handleCall = async (promise: Promise<any>) => {
    const result = await promise;
    return result;
  };

  buyERC20token = async (amount: number) => {
    const ethereumToSpend = amount * 1000000000;
    const transactionObject = {
      value: ethereumToSpend.toString()
    };

    await this.handleTransaction(this.market.buyERC20Tokens(transactionObject));
  };

  createERC721token = async (tokenURI: string) => {
    await this.handleTransaction(this.market.createERC721Token(tokenURI));
  };

  createERC1155token = async (data: Create1155) => {
    await this.handleTransaction(this.market.createERC1155Token(data.tokenURI, data.amount));
  };

  getERC20balance = async () => {
    const balance = await this.handleCall(this.market.getERC20Balance());
    return balance;
  };

  getERC721balance = async () => {
    const balance = await this.handleCall(this.market.getERC721Balance());
    return balance;
  };

  getERC1155balance = async () => {
    const balance = await this.handleCall(this.market.getERC1155Balance());
    return balance;
  };

  getMarketBalance = async () => {
    const balance = await this.handleCall(this.market.getMarketBalance());
    return balance;
  };
}

export const MarketService = new Market();
