const db = require('../models');
const auth = require('../middlewares/auth');
const Web3 = require('web3');
const interfaceAbi = require('../contracts/Ballot.json');

// API EN CONSTRUCTION - DON'T BE SCARED


exports.showString = async (req, res, next) => {
    
    console.log("debut de show yolo molo polo");

    try {

        const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        //console.log(web3);
        const Accounts = await web3.eth.getAccounts();
        let currentAccount = Accounts[0];
        console.log(currentAccount);


        if ( await web3.eth.personal.unlockAccount(currentAccount, '0x7a7a1a55fbed005f5d34d3716dc35faca37428d6c98bf2fc244608db6e498674', 600) ) {
            console.log(`${currentAccount} is unlocked`);
        }else{
            console.log(`unlock failed, ${currentAccount}`);
        }


        let myContract = await new web3.eth.Contract(interfaceAbi);
        myContract.options.address = '0x8e076456cF93ed216Dce34064681E3fC00369674';

        //console.log(myContract);

        if(myContract) {
            
            setTimeout(async () => {
                 // passing !!!
                const prop1 = await myContract.methods.proposals(0).call();
                console.log("call de proposal numba 1");
                console.log(web3.utils.hexToAscii(prop1.name));
            }, 5000);

            setTimeout(async () => {
                console.log("call de proposal numba 2"); // passing ! + get prop name &convert hex to ascii passing <3
                const prop2 = await myContract.methods.proposals(1).call();
                console.log(web3.utils.hexToAscii(prop2.name));
            }, 5000);


            setTimeout(async () => {
                console.log("call de getChairperson"); // passing !
                account = await web3.eth.accounts.privateKeyToAccount('0xe66e4eefe68ec77af900d78cd61d2e8b8e2b57a025aefe8bd55c652cee2c34b3');
                const Person = await myContract.methods.chairperson.call();
                console.log(Person);
                console.log(account.privateKey);
            }, 5000);
        }
        
        


        const { id } = req.decoded;
        console.log("entrée dans le try de get string , id du user : " + id);
          
        // monggo call
        const user = await db.User.findById(id);


        let Stringladeen = {gestrin: "ZEBEBEBEBEBE"};
        
        res.status(200);
        res.json(Stringladeen);

    } catch (err) {
        err.status = 400;
        next(err);
    }
}

exports.deployContract = async (req, res, next) => {
    
    console.log("debut du déploiement de contrat");

    try {

        const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        const Accounts = await web3.eth.getAccounts();
        let currentAccount = Accounts[0];

        if ( await web3.eth.personal.unlockAccount(currentAccount, '0x7a7a1a55fbed005f5d34d3716dc35faca37428d6c98bf2fc244608db6e498674', 600) ) {
            console.log(`${currentAccount} is unlocked`);
        }else{
            console.log(`unlock failed, ${currentAccount}`);
        }


        let myContract = await new web3.eth.Contract(interfaceAbi);
        myContract.options.data = '608060405234801561001057600080fd5b50604051610e5a380380610e5a8339810180604052602081101561003357600080fd5b81019080805164010000000081111561004b57600080fd5b8281019050602081018481111561006157600080fd5b815185602082028301116401000000008211171561007e57600080fd5b5050929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555060008090505b81518110156101b7576002604051806040016040528084848151811061015657fe5b6020026020010151815260200160008152509080600181540180825580915050906001820390600052602060002090600202016000909192909190915060008201518160000155602082015181600101555050508080600101915050610134565b5050610c92806101c86000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063609ff1bd11610066578063609ff1bd1461019d5780637d80c38e146101bb5780639e7b8d6114610205578063a3ec138d14610249578063e2ba53f0146102e657610093565b80630121b93f14610098578063013cf08b146100c65780632e4176cf1461010f5780635c19a95c14610159575b600080fd5b6100c4600480360360208110156100ae57600080fd5b8101908080359060200190929190505050610304565b005b6100f2600480360360208110156100dc57600080fd5b81019080803590602001909291905050506104a1565b604051808381526020018281526020019250505060405180910390f35b6101176104d2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61019b6004803603602081101561016f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104f7565b005b6101a5610913565b6040518082815260200191505060405180910390f35b6101c361098a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102476004803603602081101561021b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506109b3565b005b61028b6004803603602081101561025f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610bb4565b60405180858152602001841515151581526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b6102ee610c11565b6040518082815260200191505060405180910390f35b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506000816000015414156103c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f486173206e6f20726967687420746f20766f746500000000000000000000000081525060200191505060405180910390fd5b8060010160009054906101000a900460ff1615610447576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f416c726561647920766f7465642e00000000000000000000000000000000000081525060200191505060405180910390fd5b60018160010160006101000a81548160ff02191690831515021790555081816002018190555080600001546002838154811061047f57fe5b9060005260206000209060020201600101600082825401925050819055505050565b600281815481106104ae57fe5b90600052602060002090600202016000915090508060000154908060010154905082565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16156105bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f596f7520616c726561647920766f7465642e000000000000000000000000000081525060200191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610661576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f53656c662d64656c65676174696f6e20697320646973616c6c6f7765642e000081525060200191505060405180910390fd5b5b600073ffffffffffffffffffffffffffffffffffffffff16600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461080457600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691503373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156107ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f466f756e64206c6f6f7020696e2064656c65676174696f6e2e0000000000000081525060200191505060405180910390fd5b610662565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16156108f757816000015460028260020154815481106108d457fe5b90600052602060002090600202016001016000828254019250508190555061090e565b816000015481600001600082825401925050819055505b505050565b6000806000905060008090505b60028054905081101561098557816002828154811061093b57fe5b9060005260206000209060020201600101541115610978576002818154811061096057fe5b90600052602060002090600202016001015491508092505b8080600101915050610920565b505090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a58576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526028815260200180610c3f6028913960400191505060405180910390fd5b600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1615610b1b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f54686520766f74657220616c726561647920766f7465642e000000000000000081525060200191505060405180910390fd5b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015414610b6a57600080fd5b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555050565b60016020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b60006002610c1d610913565b81548110610c2757fe5b90600052602060002090600202016000015490509056fe4f6e6c79206368616972706572736f6e2063616e206769766520726967687420746f20766f74652ea165627a7a72305820c4b6cdbc0d17a4f98a36c80edbf58e810c492cdb550929b0abe73e90569f4d780029';
        
        await myContract.deploy({
            arguments: [[web3.utils.asciiToHex('proposition 1'), web3.utils.asciiToHex('proposition 2')]]
        })
        .send({
            from: currentAccount,
            gas: 150000000
        }, (error, transactionHash) => { 
                console.log("erreur du .send", error);
             })
        .on('error', (error) => {
            console.log(".ON ERROR", error); 
            next(error);

        })
        .on('transactionHash', (transactionHash) => {
            console.log(".ON TRANSACTION HASH nothing done here");
        })
        .on('receipt', (receipt) => {
            console.log(".ON RECEIPT new Address should be retrieved here");
            console.log(receipt.contractAddress); // contains the new contract address
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            console.log(".ON confNumber");
            console.log(confirmationNumber);
        })
        .then((newContractInstance) => {
            console.log(newContractInstance.options.address) // instance with the new contract address
            console.log("CONTRAT INSTANCIE A L ADRESSE CI DESSUS");
            setTimeout(async () => {
                
                console.log("call de give right to vote"); // current tx reverted by evm..
                const wololo = await myContract.methods.giveRightToVote('0xb0aea62f453cb9a3200328bcbfbbe2fa95fa36a4').send({from: currentAccount});
                console.log(wololo);
            }, 5000);


            console.log("fin du délire");
            
        });

        let Stringladeen = {gestrin: "ZEBEBEBEBEBE"};
        
        res.status(202);
        res.json(Stringladeen);    

    } catch (err) {
        err.status = 400;
        next(err);
    }
}

