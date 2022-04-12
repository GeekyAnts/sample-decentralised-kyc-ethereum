const Types = artifacts.require("Types");
const Helpers = artifacts.require("Helpers");
const Customers = artifacts.require("Customers");
const Banks = artifacts.require("Banks");
const KYC = artifacts.require("KYC");

module.exports = function (deployer, network, accounts) {
  console.log(accounts);

  if (network == "development") {
    deployer.deploy(Helpers);
    deployer.deploy(Types);
    deployer.link(Helpers, Customers);
    deployer.link(Types, Customers);
    deployer.deploy(Customers);
    deployer.link(Helpers, Banks);
    deployer.link(Types, Banks);
    deployer.deploy(Banks);
    deployer.deploy(KYC, "Suresh", "suresh@geekyants.com");
  } else {
    // For live & test networks

    deployer.deploy(Helpers);
    deployer.deploy(Types);
    deployer.link(Helpers, Customers);
    deployer.link(Types, Customers);
    deployer.deploy(Customers);
    deployer.link(Helpers, Banks);
    deployer.link(Types, Banks);
    deployer.deploy(Banks);
    deployer.deploy(KYC, "Suresh", "suresh@geekyants.com");
  }
};
