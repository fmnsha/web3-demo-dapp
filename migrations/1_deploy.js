const TweetsContract = artifacts.require("tweetsContract"); 
const UserContract = artifacts.require("User"); 
const GameContract = artifacts.require("game");  
 
module.exports = function (deployer,network, accounts) {   
    deployer.then(async () => {
        await deployer.deploy(TweetsContract);
        await deployer.deploy(UserContract);
        await deployer.deploy(GameContract, UserContract.address);
        //...
    });
};