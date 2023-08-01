import { hardhatArguments } from "hardhat";
import { add2Details, deploy } from "../utils/deploy-heper";

async function main() {
  if (!hardhatArguments.network) throw new Error("Network not provided");
  const ERC20 = await deploy("ERC20Token", []);
  const ERC721 = await deploy("ERC721Token", []);
  const ERC1155 = await deploy("ERC1155Token", []);

  const Market = await deploy("Market", [ERC20.address, ERC721.address, ERC1155.address]);
  
  add2Details("Market", Market.address, "localhost");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
