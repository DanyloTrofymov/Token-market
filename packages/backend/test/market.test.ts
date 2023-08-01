import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { deploy } from "../utils/deploy-heper";

describe("Market Contract", function () {
  let market: Contract;
  let erc20TokenContract: Contract;
  let erc721TokenContract: Contract;
  let erc1155TokenContract: Contract;

  let owner: Signer;
  let addrWithBalance: Signer;
  let addrZeroBalance: Signer;

  beforeEach(async function () {
    [owner, addrWithBalance, addrZeroBalance] = await ethers.getSigners();

    erc20TokenContract = await deploy("ERC20Token", []);
    erc721TokenContract = await deploy("ERC721Token", []);
    erc1155TokenContract = await deploy("ERC1155Token", []);

    market = await deploy("Market", [
      erc20TokenContract.address,
      erc721TokenContract.address,
      erc1155TokenContract.address,
    ]);
    

    await erc20TokenContract.transfer(addrWithBalance.getAddress(), ethers.utils.parseEther("0.1"));

  });

  it("should buy ERC20 tokens", async function () {
    await erc20TokenContract.transfer(market.address, ethers.utils.parseEther("0.1"));

    const initialBalance = await erc20TokenContract.balanceOf(await addrWithBalance.getAddress());
    await market.connect(addrWithBalance).buyERC20Tokens({ value: ethers.utils.parseEther("100") });
    const finalBalance = await erc20TokenContract.balanceOf(await addrWithBalance.getAddress());
    const marketBalance = await erc20TokenContract.balanceOf(market.address);

    expect(finalBalance).to.equal(initialBalance.add(ethers.utils.parseEther("0.0000001")));
    expect(marketBalance).to.equal(ethers.utils.parseEther("0.0999999"));
  });

  it("should create ERC721 token", async function () {
    const tokenURI = "https://example.com/token1";
    await erc20TokenContract.connect(addrWithBalance).approve(market.address, ethers.utils.parseEther("0.1"));
    const transaction = await market.connect(addrWithBalance).createERC721Token(tokenURI);
    await transaction.wait();
    const events = await erc721TokenContract.queryFilter(
      erc721TokenContract.filters.Transfer(null, null, null),
      transaction.blockNumber,
      transaction.blockNumber
    );
    const tokenId = events[0]?.args?.tokenId;

    const balance = await erc20TokenContract.balanceOf(market.address);
    expect(balance).to.equal(ethers.utils.parseEther("0.0000000000000001"));
    expect(await erc721TokenContract.getTokenURI(tokenId)).to.equal(tokenURI);
  });

  it("should create ERC1155 token", async function () {
    const tokenURI = "https://example.com/token2";
    const amount = 10;

    await erc20TokenContract.connect(addrWithBalance).approve(market.address, ethers.utils.parseEther("0.1"));
    const transaction = await market.connect(addrWithBalance).createERC1155Token(tokenURI, amount);

    await transaction.wait();
    const events = await erc1155TokenContract.queryFilter(
      erc1155TokenContract.filters.Transfer(null, null, null, null),
      transaction.blockNumber,
      transaction.blockNumber
    );
    const tokenId = events[0]?.args?.tokenId;

    const balance = await erc20TokenContract.balanceOf(market.address);

    expect(balance).to.equal(ethers.utils.parseEther("0.0000000000000001"));
    expect(await erc1155TokenContract.getTokenURI(tokenId)).to.equal(tokenURI);
    expect(await erc1155TokenContract.balanceOf(await addrWithBalance.getAddress(), tokenId)).to.equal(amount);
  });

  it("should withdraw excess tokens", async function () {
    const tokenURI = "https://example.com/token1";
    const initialBalance = await erc20TokenContract.balanceOf(await owner.getAddress());

    await erc20TokenContract.connect(addrWithBalance).approve(market.address, ethers.utils.parseEther("0.1"));
    await market.connect(addrWithBalance).createERC721Token(tokenURI);
    console.log("market.balance", await market.getMarketBalance());
    await market.connect(owner).withdrawExcessTokens();

    const finalBalance = await erc20TokenContract.balanceOf(await owner.getAddress());
    expect(finalBalance).to.equal(initialBalance.add(ethers.utils.parseEther("0.0000000000000001")));
  });

  it("should withdraw Ether", async function () {
    await erc20TokenContract.transfer(market.address, ethers.utils.parseEther("0.1"));

    const initialBalance = await ethers.provider.getBalance(await owner.getAddress());

    console.log(initialBalance);

    await market.connect(addrWithBalance).buyERC20Tokens({ value: ethers.utils.parseEther("100") });
    console.log("market.balance", await market.getMarketBalance());
    await market.connect(owner).withdrawEther();

    const finalBalance = await ethers.provider.getBalance(await owner.getAddress());
    expect(finalBalance).to.be.greaterThan(initialBalance);
    expect(finalBalance).to.be.lessThan(initialBalance.add(ethers.utils.parseEther("100")));
  });

  it("should prevent non-owner from withdrawing excess tokens", async function () {
    await expect(market.connect(addrWithBalance).withdrawExcessTokens()).to.be.revertedWith("Only the contract owner can call this function");
  });

  it("should prevent non-owner from withdrawing Ether", async function () {
    await expect(market.connect(addrWithBalance).withdrawEther()).to.be.revertedWith("Only the contract owner can call this function");
  });

  it("should prevent buying ERC20 tokens with 0 ETH", async function () {
    await expect(market.connect(addrWithBalance).buyERC20Tokens({ value: 0 })).to.be.revertedWith("ETH amount must be greater than 0");
  });

  it("should prevent buying ERC20 tokens with insufficient tokens in the market", async function () {
    const marketBalance = await erc20TokenContract.balanceOf(market.address);
    const buyAmount = marketBalance.add(ethers.utils.parseEther("1"));

    await expect(market.connect(addrWithBalance).buyERC20Tokens({ value: ethers.utils.parseEther("0.1") })).to.be.revertedWith("Insufficient tokens in the market");
  });

  it("should prevent creating ERC721 token with insufficient ERC20 tokens", async function () {
    await expect(market.connect(addrZeroBalance).createERC721Token("https://example.com/token1")).to.be.revertedWith("Insufficient ERC20 tokens");
  });

  it("should prevent creating ERC1155 token with insufficient ERC20 tokens", async function () {
    await expect(market.connect(addrZeroBalance).createERC1155Token("https://example.com/token2", 10)).to.be.revertedWith("Insufficient ERC20 tokens");
  });
});
