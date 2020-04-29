const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    // _id: { type: mongoose.Types.ObjectId, auto: true },
    name: String,
    completed: Boolean,
    pinned: Boolean
}, {
    timestamps: true
}, {
    collection: 'todos'
});

module.exports = mongoose.model('Todo', TodoSchema);