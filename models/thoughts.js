const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 240,
    },
    userName: {
        type: String,
        required: true,
    },
    timeCreated: {
        type: Date,
        default: Date.now,
        get: (time) => moment(time).format('MMMM Do YYYY, h:mm:ss a'),
    }
    },
    {
    toJSON: { getters: true }
    
    }
);

const thoughtsSchema = new Schema({
    thoughtId: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 240,
    },
    timeCreated: {
        type: Date,
        default: Date.now,
        get: (time) => moment(time).format('MMMM Do YYYY, h:mm:ss a'),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionsSchema],
    },
    {
    toJSON: { getters: true, virtuals: true },
    id: false
    }
)
thoughtsSchema.virtual('reactionAmount').get(function() {
    return this.reactions.length;
});
const Thoughts = model('Thought', thoughtsSchema);
module.exports = Thoughts;

