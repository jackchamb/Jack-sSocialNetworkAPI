const router = require('express').Router();
const {deleteReaction, addReaction, updateThoughts, deleteThoughts, getThoughtsById, getAllThoughts} = require('../controllers/thoughtsController');
router.route('/').getAllThoughts;
router.route('/:id').getThoughtsById.put(updateThoughts).delete(deleteThoughts);
router.route('/:userId').post(createThoughts);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;