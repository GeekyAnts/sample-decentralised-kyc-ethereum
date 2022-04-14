## Smart Contracts

Smart contracts are
**self-executing** contracts with the terms of the agreement
between buyer and seller being directly written into lines of code.
The code and the agreements contained therein exist across a
**distributed**, **decentralized** [blockchain](https://www.investopedia.com/terms/b/blockchain.asp)
network. Smart contracts permit trusted **transactions** and
**agreements** to be carried out among disparate, anonymous
parties without the need for a central authority, legal system, or
external enforcement mechanism. They render transactions **traceable**,
**transparent**, and **irreversible**.

## Blockchain

The smart contracts
are developed for the **ethereum** blockchain. Ethereum is a
**decentralized** platform that runs smart contracts. **Contracts**
can be deployed on the **Ethereum Virtual Machine** (EVM). Once
deployed it can be accesed globally. These contracts are enforced and
certified by parties that we call miners. Miners are multiple
computers who add a transaction (Addition or modification of the
state) to a public ledger that we call a block. Multiple blocks
constitute a blockchain.

We pay these miners
with something called _Gas_, which is the cost to run a
contract. When you publish a smart contract, or execute a function of
a smart contract, or transfer money to another account, you pay some
ether that gets converted into gas.

If you want to get started with your first smart contract, you can follow [Setting up solidity and writing our first smart contract](https://hashnode.com/preview/6236b3f0bef4c71aa6f111ac) article and write your first contract.

## Platforms

**High Level Languages** for smart contract
developing:

- [Solidity](http://solidity.readthedocs.org/en/latest/)
- [Serpent](https://github.com/ethereum/wiki/wiki/Serpent)

See the differences [here](https://ethereum.stackexchange.com/questions/126/fundamental-limitations-between-solidity-and-serpent).

**Command Line Development Management Tools** for
creating a DAPP project:

- [Truffle](https://github.com/ConsenSys/truffle)
- [Embark](https://github.com/iurimatias/embark-framework)
- [Dapple](https://github.com/nexusdev/dapple)
- [HardHat] (https://hardhat.org/)

**Testnode with RPC Interace** for deploying
contracts on a virtual node and make transactions without the need to
be mined:

- [Javascript
  testrpc](https://github.com/ethereumjs/testrpc)
- [Python
  testnode](https://github.com/ethereum/pyethereum/wiki/Using-pyethereum.tester)

**Browser based IDE** to get instant feedback for
solidity code:

- [ReMix](https://remix.ethereum.org/)
- [EthFiddle](https://ethfiddle.com/)

**Wallet clients** to connect a ethereum wallet

- Metamask
- MyEtherWallet

**Compiler**

The contracts are
written in solidity codes and these are to be compiled to get the
**Application Binary Interface** (ABI) codes. ABI is the interface
between two program modules, one of which is often at the level of
machine code. The interface is the de facto method for
encoding/decoding data into/out of the machine code. It defines how
you can encode Solidity contract calls for the EVM and, backwards,
how to read the data out of transactions. It also provides the
**Bytecode** or the opcodes of the contract.

A command line tool
such as **truffle** or online ide such as **ReMix** can be used
to compile.

**Network**

The smart contracts
are deployed on the ethereum network on the EVM. But any transaction
executed on this network requires ether to be spent, hence its not
advicable for development.

Ethereum network is
called ‘**livenet**’ and there exists multiple ‘**testnet**’
which are copies of ethereum network. Like ethereum, these networks
have currency called ‘**test ether**’s which can be spent to
execute a transcation on the network. Now the important difference is
that you can get free ‘test ether’s here unlike real valued
ether.

Some testnets are :

- **Testrpc**
  – This is a local network running on your compuetr. 10 free wallet
  accounts with test ether is allocated.
- **Ropsten**
  – This is a global testnet with free test ether.
- **Rinkeby**
  – Another global testnet with free ether.

**Wallet**

Wallets are very
important part of a smart contract. It serves 2 purposes:

- It serves as
  client to ethereum wallet. To make a transaction on network ether
  has to be spent and you can authorize these payments using this.
- To
  communicate with a blockchain and to deploy, you need to either have
  a full node or a wallet cleint of the network. A wallet can
  facilitate the communication with the network.

**Deployment**

To deploy a contract
the following steps are to be taken:

- Compile the
  code and get necessary **bytecodes** and **ABIcodes**
- Select a
  network to migrate to
- Make a
  deployment with a wallet address as transaction sender
- Authenticate
  the transaction form the wallet and pay the transaction cost.

Your contract will
be deployed and will be assigned a public address which can be used
to access it.

**Web
Interface**

A web app can be
used to work with the contract. A backend javascript framework,
**web3.js**, can intract with the blockchain. It can connect to
the network, identify the contract and perform transactions. There
are two kinds of transaction operation on a contract:

** 1.Call**

A call is a local invocation of a contract function that does not
broadcast or publish anything on the blockchain. It is a read-only
operation and will not consume any Ether. It simulates what would
happen in a transaction, but discards all the state changes when it
is done. It is synchronous and the return value of the contract
function is returned immediately.

**2.Transaction**

A transaction is broadcasted to the network, processed by miners,
and if valid, is published on the blockchain. It is a write-operation
that will affect other accounts, update the state of the blockchain,
and consume Ether (unless a miner accepts it with a gas price of
zero). It is asynchronous, because it is possible that no miners will
include the transaction in a block (for example, the gas price for
the transaction may be too low). Since it is asynchronous, the
immediate **return value of a transaction is always the
transaction's hash.**

The **web3js framework **works in the following way:

- Connect to a network using ‘**web3Provider**’ to a
  localhost(local testnet) or a global network
- Create a contract **instance** using the **ABI code **and
  C**ontract address**. Contract address identifies the particular
  contract on the network to interact with and the ABI code specifies
  how to access each function.
- Use the instance to call contract functions like
  javascript.

**Steps:**

**Install MetaMask**

1. Go to [https://metamask.io/](https://metamask.io/)
   and install the **browser plugin**.

2. Setup a **password** and open the wallet. Select the network
   as ‘**Rinkeby Test Network**’.

3. Click on ‘**CREATE ACCOUNT**’ to create a new wallet
   accout and click ‘**Copy Address to clipboard**’ to copy your
   **public address** for the wallet.

4. Go to [https://faucet.rinkeby.io/](https://faucet.rinkeby.io/)
   to get free test ether to the address. Check your account on metamask
   and verify the **balance**.

5. Repeat steps 3 and 4 to create more accounts.

**Deploying contract**

1. Go to [http://remix.ethereum.org/](http://remix.ethereum.org/)
   and **upload** your contract file (**Ballot.sol**)

2. **Compile** the code. Make sure you’ve slected ‘**Ballot.sol**’
   in the dropdown next to details. Ignore warnings.

3. Go to the **run** tab. Make sure ‘**Environment**’ is
   set as ‘**Injected Web3** ’ and shows ‘**rinkeby**’.
   Make sure ‘**Account**’ shows your wallet address in metamask.
   This is the account from which the contract will be delpoyed. ‘Gas
   limit’ and ‘Value’ has little importance on testnet but make
   sure to pay enough gas on livenet.

4. Make sure ‘**Ballot**’ is shown in the dropdown above
   ‘**create**’

(If any of the above steps fail, reload the browser)

5. click ‘**create**’ and a **popup** will appear on
   metamask. Open metamask and **Submit** the transaction. Set a
   reasonable ‘Gas limit’ and ‘Gas Price’ according to network.

6. Click on the transaction to go to
   [https://rinkeby.etherscan.io/tx/](https://rinkeby.etherscan.io/tx/)
   to know the status of transaction. If it is a **success**, your
   contract is deployed. In the ‘**To**’ section **“[Contract
   0x0000000000000000000000000000000000
   Created]”** will be shown. This is your **contract address**.
   Copy it. Click on it to know about the incoming transaction to the
   contract.

Now the contract is deployed on the rinkeby network. You can
access it using a web app.

**Web App**

1. Open **src/repository/services.ts** file. This is the typescript file
   that interacts with the contract.

2. Change the configuration file with contract details at
   **src/repository/config.tsx**

3. Go to remix page.
   In the **compile** section go to **details** tab. In the **ABI**
   section click on copy button to copy your ABI code.

4. Go to
   **src/repository/KYC.json** file and paste it replacing entire json

5. Run
   **npm install && npm start** to open the web app.

**Interacting
on web App**

Fetching details
from a contract is a ‘**call**’ transaction and would’nt be
send as a transaction from metamask.

A user making a
transaction to contract is identified by his wallet address. Make
sure to switch metamask accounts before making the transaction. Only
the address from which the contract was deployed will be able to
perform certain operations. Refer the **Contract Defenition** file
for more information.

# Smart-Contracts

### Requirements

- NodeJS v12 or later
- Windows, Linux or Mac OS X

### Set-up

```
Language => solidity
Tool => truffle
Network interface => Ganache
```

- To install `truffle` call `npm install -g truffle`
- Download `Ganache` from https://trufflesuite.com/ganache/
- `truffle` will automatically install `solidity`
