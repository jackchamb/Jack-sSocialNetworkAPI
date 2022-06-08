const {Users} = require('../models/users');
const usersController = {
    createUser({body}, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.json(err));
    },
    getALLUsers(req,res) {
        Users.find({})
        .populate({path: 'thoughts', select: 'v_v'})
        .populate({path: 'friends', select: 'v_v'})
        .select('v_v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getUserById({params}, res) {
        Users.findOne({id:params.id})
        .populate({path: 'thoughts', select: 'v_v'})
        .populate({path: 'friends', select: 'v_v'})
        .select('v_v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'No users found with this id'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => {
            console.log(err);
            res.Status(400).json(err);
        })
    },
    updateUser({params, body}, res) {
        Users.findOneAndUpdate({id:params.id}, body, {new: true, runValidators: true})
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'No users found with this id'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },
    deleteUser({params}, res) {
        Users.findOneAndDelete({id:params.id})
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'No users found with this id'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({params,}, res) {
        Users.findOneAndUpdate({id:params.id}, {$push: {friends: params.friendId}}, {new: true,})
        .populate({path: 'friends', select: ('v_v')})
        .select('v_v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'No users found with this id'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },
    removeFriend({params,}, res) {
        Users.findOneAndUpdate({id:params.id}, {$pull: {friends: params.friendId}}, {new: true,})
        .populate({path: 'friends', select: ('v_v')})
        .select('v_v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'No users found with this id'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    }
};
module.exports = usersController;