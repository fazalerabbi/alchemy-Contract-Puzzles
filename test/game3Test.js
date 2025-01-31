const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();

    return { game, signer };
  }

  it('should be a winner', async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage
    const user1 = ethers.provider.getSigner(1);
    const user2 = ethers.provider.getSigner(2);
    const user3 = ethers.provider.getSigner(3);

    const address1 = await user1.getAddress();
    const address2 = await user2.getAddress();
    const address3 = await user3.getAddress();
    // to call a contract as a signer you can use contract.connect
    await game.connect(signer).buy({ value: '1' });

    await game.connect(user1).buy({ value: '2' });
    await game.connect(user2).buy({ value: '3' });
    await game.connect(user3).buy({ value: '1' });

    // TODO: win expects three arguments
    await game.win(address1, address2, address3);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
