const db = require('../models');
const endPointNetwork = "http://13.95.171.164:4563/";
let Web3 = require('web3');

const interfaceAbi = require('../contracts/Ballot.json');
const byteCode = "0x606060405234156200001057600080fd5b604051620010603803806200106083398101604052808051820191906020018051820191906020018051820191905050600033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160046000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000181905550600090505b8251811015620001845760058054806001018281620001129190620003e2565b91600052602060002090600202016000604080519081016040528087868151811015156200013c57fe5b906020019060200201516000191681526020016000815250909190915060008201518160000190600019169055602082015181600101555050508080600101915050620000f2565b600090505b8151811015620001e957620001ca8282815181101515620001a657fe5b906020019060200201516200021264010000000002620008bd176401000000009004565b6000808154809291906001019190505550808060010191505062000189565b6200020884620003696401000000000262000a11176401000000009004565b50505050620004f8565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156200026f57600080fd5b600460008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16151515620002cc57600080fd5b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001541415156200031e57600080fd5b6001600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515620003c657600080fd5b8060039080519060200190620003de92919062000417565b5050565b81548183558181151162000412576002028160020283600052602060002091820191016200041191906200049e565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200045a57805160ff19168380011785556200048b565b828001600101855582156200048b579182015b828111156200048a5782518255916020019190600101906200046d565b5b5090506200049a9190620004d0565b5090565b620004cd91905b80821115620004c957600080820160009055600182016000905550600201620004a5565b5090565b90565b620004f591905b80821115620004f1576000816000905550600101620004d7565b5090565b90565b610b5880620005086000396000f30060606040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630121b93f146100935780632e4176cf146100b6578063409e22051461010b5780635c19a95c14610151578063609ff1bd1461018a5780636a2275db146101b3578063a3ec138d14610241578063e2ba53f0146102d3575b600080fd5b341561009e57600080fd5b6100b46004808035906020019091905050610304565b005b34156100c157600080fd5b6100c96103d5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561011657600080fd5b61012c60048080359060200190919050506103fb565b6040518083600019166000191681526020018281526020019250505060405180910390f35b341561015c57600080fd5b610188600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061042e565b005b341561019557600080fd5b61019d610718565b6040518082815260200191505060405180910390f35b34156101be57600080fd5b6101c6610793565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102065780820151818401526020810190506101eb565b50505050905090810190601f1680156102335780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561024c57600080fd5b610278600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610831565b60405180858152602001841515151581526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b34156102de57600080fd5b6102e661088e565b60405180826000191660001916815260200191505060405180910390f35b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050600081600001541415151561035b57600080fd5b8060010160009054906101000a900460ff1615151561037957600080fd5b60018160010160006101000a81548160ff02191690831515021790555081816002018190555080600001546005838154811015156103b357fe5b9060005260206000209060020201600101600082825401925050819055505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60058181548110151561040a57fe5b90600052602060002090600202016000915090508060000154908060010154905082565b600080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002091508160010160009054906101000a900460ff1615151561049057600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156104cb57600080fd5b5b600073ffffffffffffffffffffffffffffffffffffffff16600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561060957600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1692503373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561060457600080fd5b6104cc565b60018260010160006101000a81548160ff021916908315150217905550828260010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16156106fc578160000154600582600201548154811015156106d957fe5b906000526020600020906002020160010160008282540192505081905550610713565b816000015481600001600082825401925050819055505b505050565b6000806000809150600090505b60058054905081101561078e578160058281548110151561074257fe5b90600052602060002090600202016001015411156107815760058181548110151561076957fe5b90600052602060002090600202016001015491508092505b8080600101915050610725565b505090565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108295780601f106107fe57610100808354040283529160200191610829565b820191906000526020600020905b81548152906001019060200180831161080c57829003601f168201915b505050505081565b60046020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b6000600561089a610718565b8154811015156108a657fe5b906000526020600020906002020160000154905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561091957600080fd5b600460008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1615151561097557600080fd5b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001541415156109c657600080fd5b6001600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a6d57600080fd5b8060039080519060200190610a83929190610a87565b5050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610ac857805160ff1916838001178555610af6565b82800160010185558215610af6579182015b82811115610af5578251825591602001919060010190610ada565b5b509050610b039190610b07565b5090565b610b2991905b80821115610b25576000816000905550600101610b0d565b5090565b905600a165627a7a7230582041ba977f2b7a068c7fec7b0044f671dbb747d35a832d972a8a7741d6d9f9aef30029";

exports.showPolls = async (req, res, next) => {
    try {
        const polls = await db.Poll.find().populate('user', ['username', 'id']);
        res.status(200).json(polls);
    } catch (err) {
        err.status = 400;
        next(err);
    }
}

////// POLL FOR A SPECIFIC USER

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
        if(typeof web3 != 'undefined') {
            web3 = await new Web3(web3.currentProvider);
        } else {
            web3 = await new Web3(new Web3.providers.HttpProvider(endPointNetwork));
            if(!web3.isConnected()) {
                console.log("not connected");
            } else {
                console.log("connected");
            }
        }
        const { id } = req.decoded;
        console.log("id du user :", id);
        const user = await db.User.findById(id);
        const { question, options, voters } = req.body;
        console.log("debut du déploiement de contrat + poll sur mongo db, args :", question, options, voters);
        let listOpt = options.map(option => ({ option, votes: 0 }));
	    console.log(listOpt);
        let optTab = [];
        for(let i = 0; i < listOpt.length; i++){
            optTab[i] = web3.fromAscii(listOpt[i].option);
            console.log(`opt tab de ${i}  : ` + web3.padRight(optTab[i], 20, '0'));
        }

        let currentAccount = user.ethAddress;
        console.log("currentAccount : " + currentAccount);
        let balance = web3.eth.getBalance(currentAccount)
        console.log("Balance : " + balance);

        if (web3.personal.unlockAccount(currentAccount, "Azemlk123", 1000) ) {
            console.log(`${currentAccount} is unlocked`);
        }else{
            console.log(`unlock failed, ${currentAccount}`);
        }

        for(let i = 0; i < voters.length; i++){
            if(web3.isAddress(voters[i])){
                console.log("ceci est bien une adresse ethereum :", voters[i]);
            }else{
                console.log("invalid eth address");
            }
        }

        let MyContract = web3.eth.contract(interfaceAbi);
        let gasEstimate = web3.eth.estimateGas({data: byteCode});
        console.log("Estimation du gaz : " + gasEstimate);
        // TODO : Faire en sorte que les votants soient entré en tant qu'email et que moi je translate en ethAddr pour le contrat
            let myContractReturned = await MyContract.new(req.body.question, optTab, voters, {
                from: currentAccount,
                data: byteCode,
                gas: 94000000 }, async (err, myContract) => {
                try{
                    if(!err) {
                        if(!myContract.address) {
                            console.log("TX HASH :   " + myContract.transactionHash); // The hash of the transaction, which deploys the contract
                        // check address on the second call (contract deployed)
                        } else {
                            console.log("CONTRACT ADDRESS  : " + myContract.address);
                            setTimeout(async () => {
                            let poll = await db.Poll.create({
                                user,
                                question,
                                options: options.map(option => ({ option, votes: 0 })),
                                voters: voters,
                                contractAddress: myContractReturned.address,
                                chairpersonAdress: currentAccount
                            });
                            await user.polls.push(poll._id);
                            await user.save();
                            res.status(201).json({...poll._doc, user: user._id});
                            }, 5000);
                            
                        }
                    }else{
                        console.log(err);
                    }
                }catch(err){
                    next(err);
                };
        });
    }catch(err) {
        next(err);
    }
}


exports.getPoll = async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id);
        const poll = await db.Poll.findById(id).populate('user', ['username', 'id']);
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

        if(typeof web3 != 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider(endPointNetwork));
            if(!web3.isConnected()) {
                console.log("not connected");
            } else {
                console.log("connected");
            }
        }

        let i = 0;
        if(answer) {
            const poll = await db.Poll.findById(pollId);
            let votingContracObj = web3.eth.contract(interfaceAbi);
            let myContractInstance= votingContracObj.at(poll.contractAddress);
            console.log("Poll info : " + poll);
            if(!myContractInstance) throw new Error('No instance of contract');
            if(!poll) throw new Error('No poll found'); 
            const vote = poll.options.map(          // récupération de l'option choisie
                option => {
                    if(option.option == answer) {
                        return {
                            id: option._id,
                            option: option.option,
                            votes: option.votes + 1
                        };
                    } else {
                        return option;
                    }
                }
            );
            // si le user id n'est pas présent dans le poll.voted il peut voter
            if(poll.voted.filter(user => user.toString() === userId).length <= 0) {
                    user = await db.User.findById(userId);
                    for(i; i < poll.options.length; i++){
                            if(poll.options[i].option == answer){
                                // console.log(poll.options[i].option + " // " + answer);
                                console.log("option trouvée, lancement du vote ");
                                myContractInstance.vote(i, {from: user.ethAddress, gas: 8000000}, async function(err, result){ 
                                    if(!err){
                                        console.log("result (obviously a tx hash)" + result);
                                    }else{
                                        throw new Error('Voting function didnt work ?!');
                                    }
                                });
                                
                            }
                        }
                    i = 0;
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

