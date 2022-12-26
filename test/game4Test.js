const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const user1 = ethers.provider.getSigner(0);
    const user2 = ethers.provider.getSigner(1);


    return { game, user1, user2 };
  }
  it('should be a winner', async function () {
    const { game, user1, user2 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    const address1 = await user1.getAddress();
    const address2 = await user2.getAddress();

    await game.connect(user1).write(address2);
    await game.connect(user2).win(address1);
    
    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
