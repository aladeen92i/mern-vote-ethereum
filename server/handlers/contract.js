const db = require('../models');


exports.showString = async (req, res, next) => {

    console.log("debut de get string");
    
    try {
        
        const { id } = req.decoded;
        console.log("entrée dans le try de get string , id du user : " + id);
        const user = await db.User.findById(id); 
        console.log(user);
        //const Stringladeen = "ZEBEBEBEBEBE";
        //if(!user) throw new Error('No user found');
        res.status(200).json(user);

    } catch(err) {
        err.status = 400;
        err.message = "omg noob";
        next(err);
    }

}