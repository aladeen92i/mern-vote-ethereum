const db = require('../models');
const auth = require('../middlewares/auth');
const Web3 = require('web3');
const interfaceAbi = require('../contracts/Ballot.json');

exports.showString = async (req, res, next) => {
    
    console.log("debut de show yolo molo polo");
    //console.log(interfaceAbi);

    try {


        let userAccount = "";
        const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        //console.log(web3);
        const Accounts = await web3.eth.getAccounts();
        let currentAccount = Accounts[0];
        //console.log(currentAccount);


        if ( await web3.eth.personal.unlockAccount(currentAccount, '0xad4cd149ead1d8ca0e2485afc3932333f1942ba32007749e39c80469752862d4', 600) ) {
            console.log(`${currentAccount} is unlocked`);
        }else{
            console.log(`unlock failed, ${currentAccount}`);
        }


        let myContract = await new web3.eth.Contract(interfaceAbi);
        myContract.options.address = '0x0Bb9797EA05fADc7562e63bb7cF329FD6FFB915A';

        
        //console.log(myContract);

        if(myContract) {
            console.log("youpi");
            setTimeout(async () => {
                const names = await myContract.methods.proposals(0).call();
                console.log(names);
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


