import { Response, Request } from 'express';
import Moralis from 'moralis/.';
import { sendResponse } from '../utils/responceSender.util';

class MoralisController {
  async getOwners(req: Request, res: Response) {
    const { address } = req.params;
    const owners = await Moralis.EvmApi.nft.getNFTOwners({
      chain: '0x5',
      format: 'decimal',
      normalizeMetadata: true,
      address
    });
    console.log(owners);
    return sendResponse(res, owners);
  }
}

export const moralisController = new MoralisController();
