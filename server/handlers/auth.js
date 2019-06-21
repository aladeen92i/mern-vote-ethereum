//const jwt = require('jsonwebtoken');
const db = require('../models');
require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

////// REGISTER FONCTION FOR MONGODB

exports.register = async (req, res, next) => {
    try {
        const alreadyExist = await db.User.findOne({email: req.body.email});
        console.log("Voici l'utilisateur deja inscrit possedant cet email" + alreadyExist);

        if(alreadyExist == null){
          const user = await db.User.create(req.body);
          const  { id, username, email } = user;
          await user.save(async () => {
            try{
                let registrationToken = await db.Token.create({ _userId: user._id, token: crypto.randomBytes(16).toString('hex')});
                await registrationToken.save(async () => {
                  try{
                      console.log('Credentials obtained, sending message...');
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
                          subject: 'Account Verification Token',
                          text: '',
                          html: 'Hello,\n\n' + 'Please verify your account by clicking the link: \n<a>http:\/\/' + 'api/' +req.headers.host + '\/confirmation\/' + registrationToken.token + '</a>' + '.\n'
                      };
                      transporter.sendMail(message, (err, info) => {
                          if (err) {
                            console.log('Error occurred. ' + err.message);
                            throw new Error(err.message)
                          }
                      });
                      res.status(201).json({id, username});
                  }catch(err){
                    next(err);
                  }
                });
            }catch(err){
              next(err);
            }
          });
          //const jwToken = jwt.sign({id, username}, process.env.SECRET);
          //end of if(!alreadyExist)
        }else{
          throw new Error('email is already taken');
        }
      }catch(err) {
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
    

    if (valid && user.isVerified) {
      const token = jwt.sign({ id, username }, process.env.SECRET);
      return res.status(200).json({
          id,
          username,
          token,
        });
    } else {
      throw new Error('Invalid, email has not been verified');
    }
  } catch (err) {
    return next({ status: 400, message: 'Invalid Username/Password' });
  }
};

// confirmation function for emailed-token

exports.confirmation = async (req, res, next) => {
  try {
      db.Token.findOne({ token: req.body.token }, function (err, token) {
      if (!token) throw new Error('invalid token, it may have expired: ' + err.message);

      
      // If we found a token, find a matching user
      User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
          if (!user) throw new Error('Coudnt find a user for this token');
          if (user.isVerified) throw new Error('Email has already been verified' + err.message);

          // Verify and save the user
          user.isVerified = true;
          user.save(function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              res.status(200).send("The account has been verified. Please log in.");
          });
      });
  });
  } catch (err) {
    return next({ status: 400, message: 'Invalid token' });
  }
};