
const db = require('../models');

////// POLLS GETTER FUNCTION FOR MONGO

exports.showPolls = async (req, res, next) => {
    try {
        const polls = await db.Poll.find()
            .populate('user', ['username', 'id']);

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
        const user = await db.User.findById(id).populate('polls');
        res.status(200).json(user.polls);

    } catch(err) {
        err.status = 400;
        return next({status: 400, message: err.message});
    }
}

////// POLL CREATE FUNCTION FOR MONGO

exports.createPoll = async (req, res, next) => {
    try {
        console.log(req.decoded);
        const { id } = req.decoded;
        const user = await db.User.findById(id);

        const { question, options } = req.body;
        const poll = await db.Poll.create({
            question,
            user,
            options: options.map(option => ({ option, votes: 0 }))
        });

        user.polls.push(poll._id);
        await user.save();

        res.status(201).json({...poll._doc, user: user._id});

    } catch (err) {
        next(err);
    }
}

exports.getPoll = async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id);
        const poll = await db.Poll.findById(id)
            .populate('user', ['username', 'id']);
        
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

        if(answer) {

            const poll = await db.Poll.findById(pollId);
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