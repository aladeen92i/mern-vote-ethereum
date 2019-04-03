const db = require('../models');
const Web3 = require('web3');
const interfaceAbi = require('../contracts/Ballot.json');
const bytecode = '60806040523480156200001157600080fd5b506040516200110638038062001106833981018060405260608110156200003757600080fd5b8101908080516401000000008111156200005057600080fd5b828101905060208101848111156200006757600080fd5b81518560018202830111640100000000821117156200008557600080fd5b50509291906020018051640100000000811115620000a257600080fd5b82810190506020810184811115620000b957600080fd5b8151856020820283011164010000000082111715620000d757600080fd5b50509291906020018051640100000000811115620000f457600080fd5b828101905060208101848111156200010b57600080fd5b81518560208202830111640100000000821117156200012957600080fd5b505092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160046000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555060008090505b82518110156200026857600560405180604001604052808584815181106200020657fe5b6020026020010151815260200160008152509080600181540180825580915050906001820390600052602060002090600202016000909192909190915060008201518160000155602082015181600101555050508080600101915050620001e2565b5060008090505b8151811015620002bd576200029e8282815181106200028a57fe5b6020026020010151620002d860201b60201c565b600080815480929190600101919050555080806001019150506200026f565b50620002cf83620004df60201b60201c565b50505062000605565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161462000380576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526028815260200180620010de6028913960400191505060405180910390fd5b600460008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff161562000444576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f54686520766f74657220616c726561647920766f7465642e000000000000000081525060200191505060405180910390fd5b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154146200049457600080fd5b6001600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146200053a57600080fd5b80600390805190602001906200055292919062000556565b5050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200059957805160ff1916838001178555620005ca565b82800160010185558215620005ca579182015b82811115620005c9578251825591602001919060010190620005ac565b5b509050620005d99190620005dd565b5090565b6200060291905b80821115620005fe576000816000905550600101620005e4565b5090565b90565b610ac980620006156000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063609ff1bd1161005b578063609ff1bd146101925780636a2275db146101b0578063a3ec138d14610233578063e2ba53f0146102d057610088565b80630121b93f1461008d5780632e4176cf146100bb578063409e2205146101055780635c19a95c1461014e575b600080fd5b6100b9600480360360208110156100a357600080fd5b81019080803590602001909291905050506102ee565b005b6100c361048b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101316004803603602081101561011b57600080fd5b81019080803590602001909291905050506104b1565b604051808381526020018281526020019250505060405180910390f35b6101906004803603602081101561016457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104e2565b005b61019a6108fe565b6040518082815260200191505060405180910390f35b6101b8610975565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101f85780820151818401526020810190506101dd565b50505050905090810190601f1680156102255780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102756004803603602081101561024957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a13565b60405180858152602001841515151581526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b6102d8610a70565b6040518082815260200191505060405180910390f35b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506000816000015414156103ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f486173206e6f20726967687420746f20766f746500000000000000000000000081525060200191505060405180910390fd5b8060010160009054906101000a900460ff1615610431576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f416c726561647920766f7465642e00000000000000000000000000000000000081525060200191505060405180910390fd5b60018160010160006101000a81548160ff02191690831515021790555081816002018190555080600001546005838154811061046957fe5b9060005260206000209060020201600101600082825401925050819055505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600581815481106104be57fe5b90600052602060002090600202016000915090508060000154908060010154905082565b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16156105aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f596f7520616c726561647920766f7465642e000000000000000000000000000081525060200191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561064c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f53656c662d64656c65676174696f6e20697320646973616c6c6f7765642e000081525060200191505060405180910390fd5b5b600073ffffffffffffffffffffffffffffffffffffffff16600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146107ef57600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691503373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156107ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f466f756e64206c6f6f7020696e2064656c65676174696f6e2e0000000000000081525060200191505060405180910390fd5b61064d565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16156108e257816000015460058260020154815481106108bf57fe5b9060005260206000209060020201600101600082825401925050819055506108f9565b816000015481600001600082825401925050819055505b505050565b6000806000905060008090505b60058054905081101561097057816005828154811061092657fe5b9060005260206000209060020201600101541115610963576005818154811061094b57fe5b90600052602060002090600202016001015491508092505b808060010191505061090b565b505090565b60038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a0b5780601f106109e057610100808354040283529160200191610a0b565b820191906000526020600020905b8154815290600101906020018083116109ee57829003601f168201915b505050505081565b60046020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b60006005610a7c6108fe565b81548110610a8657fe5b90600052602060002090600202016000015490509056fea165627a7a7230582014e497ddbb782f9aacceabd6bae644b46ed9781257439e6ec7725b86951925d100294f6e6c79206368616972706572736f6e2063616e206769766520726967687420746f20766f74652e';

exports.showPolls = async (req, res, next) => {
    try {
        const polls = await db.Poll.find().populate('user', ['username', 'id']);
        console.log(polls);
        res.status(200).json(polls);
    } catch (err) {
        err.status = 400;
        next(err);
    }
}

////// POLL FOR A SPECIFIC USERr

exports.usersPolls = async(req, res, next) => {
    try {
        const { id } = req.decoded;
        console.log(id);
        const user = await db.User.findById(id).populate('polls');
        res.status(200).json(user.polls);

    } catch(err) {
        err.status = 400;
        console.log("error users polls");
        return next({status: 400, message: err.message});
    }
}

////// POLL CREATE FUNCTION FOR MONGO

exports.createPoll = async (req, res, next) => {
    try {
        const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        const { id } = req.decoded;
        console.log("id du user :", id);
        const user = await db.User.findById(id);
        const { question, options, voters } = req.body;
        console.log("debut du déploiement de contrat + poll sur mongo db, args :", question, options, voters);
        let listOpt = options.map(option => ({ option, votes: 0 }));
        let optTab = [];

        for(let i = 0; i < listOpt.length; i++){
            optTab[i] = web3.utils.asciiToHex(listOpt[i].option);
        }

        let currentAccount = user.ethAddress;

        if ( await web3.eth.personal.unlockAccount(currentAccount, '0x38bfe6f3f3d6c11c1c1fe248520f98d066520e08c83273180b53d4faa00adb5f', 600) ) {
            console.log(`${currentAccount} is unlocked`);
        }else{
            console.log(`unlock failed, ${currentAccount}`);
        }
        
        let myContract = await new web3.eth.Contract(interfaceAbi);
        myContract.options.data = bytecode;

        for(let i = 0; i < voters.length; i++){

            if(web3.utils.isAddress(voters[i])){
                console.log("ceci est bien une adresse ethereum :", voters[i]);
            }else{
                console.log("invalid eth address");
            }
        }
        await myContract.deploy({
            arguments: [req.body.question, optTab, voters]
        })
        .send({
            from: currentAccount,
            gas: 150000000
        }, (error, transactionHash) => {   
                })
        .on('error', (error) => {
            //console.log(".ON ERROR", error); 
            //next(error);
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
            console.log(newContractInstance.options.address); // instance with the new contract address
            console.log("CONTRAT INSTANCIE A L ADRESSE CI DESSUS");
            console.log("fin du délire");
            setTimeout(async () => {
                let poll = await db.Poll.create({
                    user,
                    question,
                    options: options.map(option => ({ option, votes: 0 })),
                    voters: voters,
                    contractAddress: newContractInstance.options.address,
                    chairpersonAdress: currentAccount
                });
                await user.polls.push(poll._id);
                await user.save();
            }, 5000);
            res.status(201).json({...poll._doc, user: user._id});
        });
    } catch (err) {
        next(err);
    }
}


exports.getPoll = async (req, res, next) => {

    try {
        const {id} = req.params;
        console.log(id);
        const poll = await db.Poll.findById(id).populate('user', ['username', 'id']);
        console.log(poll);
        if(!poll) throw new Error('No poll found');
        res.status(200).json(poll);
    } catch (err) {
        err.status = 400;
        next(err);
    }
}

exports.deletePoll = async (req, res, next) => {
    try {
        const {id: pollId} = req.params;
        const {id: userId} = req.decoded;
        const poll = await db.Poll.findById(pollId);

        if(!poll) throw new Error('No poll found');

        if(poll.user.toString() !== userId) {
            throw new Error('Unauthorized access');
        }

        await poll.remove();
        res.status(200).json(poll);
        
    } catch (err) {
        err.status = 400;
        next(err);
    }
}

exports.vote = async (req, res, next) => {
    try {
        const {id: pollId} = req.params;
        const {id: userId} = req.decoded;
        const {answer} = req.body;
        const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        let myContract = await new web3.eth.Contract(interfaceAbi);

        if(answer) {

            const poll = await db.Poll.findById(pollId);
            myContract.options.address = poll.contractAddress;

            if(!poll) throw new Error('No poll found'); 
            const vote = poll.options.map(
                option => {
                    if(option.option == answer) {
                        return {
                            option: option.option,
                            id: option._id,
                            votes: option.votes + 1
                        };
                    } else {
                        return option;
                    }
                }
            );

            if(poll.voted.filter(user => user.toString() === userId).length <= 0) {
                    myContract.methods.vote()
                    poll.voted.push(userId);
                    poll.options = vote;
                    await poll.save();
                    res.status(202).json(poll);
                } else {
                    throw new Error('Already voted');
                }
        } else {
            throw new Error('No answer');
        }
    } catch(err) {
        err.status = 400;
        next(err);
    }
}