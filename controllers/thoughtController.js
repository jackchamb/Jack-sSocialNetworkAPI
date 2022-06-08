const {Users, Thoughts} = require('../models');
const thoughtsController = {
    createThoughts({params, body}, res) {
        Thoughts.create(body)
        .then(({id}) => {
            return Users.findAndUpdate({id_: params.userId}, {$push: {thoughts: id}}), {new: true}
        })
        .then(dbThoughtsData => { if (!dbThoughtsData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.json(err));
    },
    getThoughts(req,res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: 'v_v'})
        .select('v_v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getThoughtById({params}, res) {
        Thoughts.findById({id_:params.id})
        .populate({path: 'reactions', select: 'v_v'})
        .select('v_v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts found with this id'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    updateThought({params, body}, res) {
        Thoughts.findByIdAndUpdate({id_:params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: 'v_v'})
        .select('v_v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts found with this id'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },
    deleteThought({params}, res) {
        Thoughts.findByIdAndDelete({id_:params.id})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts found with this id'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },
    getThoughtReactions({params, body}, res) {
        Thoughts.findById({id_:params.id}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: 'v_v'})
        .select('v_v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts found with this id'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    }
};
module.exports = thoughtsController;
        