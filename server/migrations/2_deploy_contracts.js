const MyStringStore = artifacts.require("MyStringStore");
const Ballot = artifacts.require("Ballot");

module.exports = function(deployer) {
  deployer.deploy(MyStringStore);
  deployer.deploy(Ballot, ["0x0123", "0x0245"]);
};
