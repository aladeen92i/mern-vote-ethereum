const jwt = require('jsonwebtoken');
const db = require('../models');
require('dotenv').config();
const nodemailer = require('nodemailer');

////// REGISTER FONCTION FOR MONGODB

exports.register = async (req, res, next) => {
    try {
        const user = await db.User.create(req.body);
        const  { id, username, email } = user;
        const token = jwt.sign({id, username}, process.env.SECRET);
        console.log('Credentials obtained, sending message...');console.log(" check .env passwd : " + process.env.GMAIL_PASSWORD);console.log(" check .env user : " + process.env.GMAIL_USER);
        
        

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            requireTLS: true,
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASSWORD
            }
        });

        // Message object
        let message = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Registration for GFI BLockchainVoting',
            text: 'Hello, Thanks for your registration, here is a reminder of your credentials :',
            html: '<p>Hello,<br/> Thanks for your registration, here is a reminder of your credentials :</p>'
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
              console.log('Error occurred. ' + err.message);
              return process.exit(1);
            }
        });

        res.status(201).json({ id, username, token});
        //res.json({ id, username });

    } catch(err) {
        if(err.code === 11000) {
            err.message = 'Username already taken :(';
        }
        next(err);
    }
 };

////// LOGIN FUNCTION VIA MONGODB

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      username: req.body.username,
    });
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const token = jwt.sign({ id, username }, process.env.SECRET);
      return res.status(200).json({
        id,
        username,
        token,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    return next({ status: 400, message: 'Invalid Username/Password' });
  }
};