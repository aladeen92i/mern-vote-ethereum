const db = require('../models');
let fs = require("fs");
let Web3 = require("web3");
let web3 = new Web3('ws://13.95.129.230:4563');
const interfaceAbi = require('../contracts/Ballot.json');

exports.showPolls = async (req, res, next) => {
    try {
        const polls = await db.Poll.find().populate('user', ['username', 'id']);
        //console.log(polls);
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
        const web3 = new Web3(Web3.givenProvider || bfHost);
        const { id } = req.decoded;
        console.log("id du user :", id);
        const user = await db.User.findById(id);
        const { question, options, voters } = req.body;
        console.log("debut du déploiement de contrat + poll sur mongo db, args :", question, options, voters);
        let listOpt = options.map(option => ({ option, votes: 0 }));
        let optTab = [];

        for(let i = 0; i < listOpt.length; i++){
            optTab[i] = web3.utils.fromAscii(listOpt[i].option);
            console.log(`opt tab de ${i}` + web3.utils.padRight(optTab[i], 20, '0'));
        }
        console.log(optTab);
        let currentAccount = user.ethAddress;

        if (await web3.eth.personal.unlockAccount(currentAccount, '0x6426cc7c79ab00c3606250ca60e815d3a3cc32ed4e0bcc6319231285490968cd', 600) ) {
            console.log(`${currentAccount} is unlocked`);
        }else{
            console.log(`unlock failed, ${currentAccount}`);
        }
        
        let myContract = await new web3.eth.Contract(interfaceAbi);
        myContract.options.data = "0x608060405234801561001057600080fd5b5060405162000c7538038062000c758339810180604052606081101561003557600080fd5b81019080805164010000000081111561004d57600080fd5b8281019050602081018481111561006357600080fd5b815185600182028301116401000000008211171561008057600080fd5b5050929190602001805164010000000081111561009c57600080fd5b828101905060208101848111156100b257600080fd5b81518560208202830111640100000000821117156100cf57600080fd5b505092919060200180516401000000008111156100eb57600080fd5b8281019050602081018481111561010157600080fd5b815185602082028301116401000000008211171561011e57600080fd5b505092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160046000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555060008090505b825181101561025a57600560405180604001604052808584815181106101f957fe5b60200260200101518152602001600081525090806001815401808255809150509060018203906000526020600020906002020160009091929091909150600082015181600001556020820151816001015550505080806001019150506101d7565b5060008090505b81518110156102aa5761028c82828151811061027957fe5b60200260200101516102c260201b60201c565b60008081548092919060010191905055508080600101915050610261565b506102ba836104c660201b60201c565b5050506105df565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610369576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602881526020018062000c4d6028913960400191505060405180910390fd5b600460008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff161561042c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f54686520766f74657220616c726561647920766f7465642e000000000000000081525060200191505060405180910390fd5b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001541461047b57600080fd5b6001600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461052057600080fd5b806003908051906020019061053692919061053a565b5050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061057b57805160ff19168380011785556105a9565b828001600101855582156105a9579182015b828111156105a857825182559160200191906001019061058d565b5b5090506105b691906105ba565b5090565b6105dc91905b808211156105d85760008160009055506001016105c0565b5090565b90565b61065e80620005ef6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063609ff1bd1161005b578063609ff1bd146101435780636a2275db14610161578063a3ec138d146101e4578063e2ba53f0146102815761007d565b80630121b93f146100825780632e4176cf146100b0578063409e2205146100fa575b600080fd5b6100ae6004803603602081101561009857600080fd5b810190808035906020019092919050505061029f565b005b6100b861043c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101266004803603602081101561011057600080fd5b8101908080359060200190929190505050610462565b604051808381526020018281526020019250505060405180910390f35b61014b610493565b6040518082815260200191505060405180910390f35b61016961050a565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101a957808201518184015260208101905061018e565b50505050905090810190601f1680156101d65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610226600480360360208110156101fa57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105a8565b60405180858152602001841515151581526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b610289610605565b6040518082815260200191505060405180910390f35b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008160000154141561035d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f486173206e6f20726967687420746f20766f746500000000000000000000000081525060200191505060405180910390fd5b8060010160009054906101000a900460ff16156103e2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f416c726561647920766f7465642e00000000000000000000000000000000000081525060200191505060405180910390fd5b60018160010160006101000a81548160ff02191690831515021790555081816002018190555080600001546005838154811061041a57fe5b9060005260206000209060020201600101600082825401925050819055505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6005818154811061046f57fe5b90600052602060002090600202016000915090508060000154908060010154905082565b6000806000905060008090505b6005805490508110156105055781600582815481106104bb57fe5b90600052602060002090600202016001015411156104f857600581815481106104e057fe5b90600052602060002090600202016001015491508092505b80806001019150506104a0565b505090565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105a05780601f10610575576101008083540402835291602001916105a0565b820191906000526020600020905b81548152906001019060200180831161058357829003601f168201915b505050505081565b60046020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b60006005610611610493565b8154811061061b57fe5b90600052602060002090600202016000015490509056fea165627a7a72305820b493aee45d298fca0c49581c10934222032690f9e7ed605bb7bab50f5d7f7ea600294f6e6c79206368616972706572736f6e2063616e206769766520726967687420746f20766f74652e";

        for(let i = 0; i < voters.length; i++){
            if(web3.utils.isAddress(voters[i])){
                console.log("ceci est bien une adresse ethereum :", voters[i]);
            }else{
                console.log("invalid eth address");
            }
        }

        console.log(optTab);
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
        //console.log(poll);
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
        const web3 = new Web3(Web3.givenProvider || 'ws://13.95.129.230:4563');
        let myContract = await new web3.eth.Contract(interfaceAbi);
        let i = 0;

        if(answer) {

            const poll = await db.Poll.findById(pollId);
            myContract.options.address = poll.contractAddress;

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
                                await myContract.methods.vote(i).send({from: user.ethAddress})
                                .on('transactionHash', (hash) => {
                                    
                                })
                                .on('receipt', (receipt) => {
                                    
                                })
                                .on('confirmation', (confirmationNumber, receipt) => {
                                    console.log(confirmationNumber);
                                })
                                .on('error', console.error);
                                console.log("fin du vote");
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
