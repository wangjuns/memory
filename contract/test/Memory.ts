import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Memory", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const MemoryContract = await ethers.getContractFactory("HaiheSFriends");
    const memory = await MemoryContract.deploy();

    return { memory };
  }

  describe("Deployment", function () {
    it("Contract's name and symbol should correct", async function () {
      const { memory } = await loadFixture(deployOneYearLockFixture);

      expect(await memory.name()).to.equal("Haihe's Friends");
      expect(await memory.symbol()).to.equal("HHF");

    });
  });

  describe("Mint", function () {
    it("Contract's name and symbol should correct", async function () {
      const { memory } = await loadFixture(deployOneYearLockFixture);
      await memory["mint(string)"]("foo bar")
      expect(await memory.ownerOf(0)).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    });
  });

  describe("Transfer", function () {
    it("Contract's name and symbol should correct", async function () {
      const { memory } = await loadFixture(deployOneYearLockFixture);
      await memory["mint(string)"]("foo bar")
      expect(await memory.ownerOf(0)).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    });
  });
});
