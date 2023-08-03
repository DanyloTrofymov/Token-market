import HttpService from './http.service';
import { BACKEND_KEYS } from '../../common/consts/app-keys.const';
import { IResponce } from '../../common/types/responce.type';

class Moralis extends HttpService {
  getOwners(): Promise<IResponce> {
    const url = `${BACKEND_KEYS.MORALIS_GET_OWNERS}?address=${process.env.REACT_APP_MARKET_ADDRESS}`;
    return this.get({
      url
    });
  }
}

export const MoralisService = new Moralis();
