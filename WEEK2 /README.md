## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
### UNDERSTAND->
### SETUP
1.Created/Installed  Foundry in a folder
2.Created Ledger contract
3.THE contract helps to->
Accepts ETH deposits,Reverts if 0 ETH is sent,Emits Deposit event on successful deposit,Tracks total ETH deposited per address,Stores all depositor addresses
4.Write Deployment Script and deploy using this command in terminal-> forge script script/DeployLedger.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --private-key $PRIVATE_KEY
5.Your contract will be deployed.
6.Use this sepolia address and paste on etherscan.io for more info.
7.Write tests like-> ENOUGH ETH IS SENT;DEPOSITERSADDRESS IS UPDATED;DEPOSITS ARE TRACKED or not;and affirm whether they are working properly by writing->>>forge test and for more clearity and info -> forge test -vvvvvv
### USAGE
1.Deposits eth 
2.Shows balance of account
3.Shows basic errors to the user in case ,if any of them occurs.
