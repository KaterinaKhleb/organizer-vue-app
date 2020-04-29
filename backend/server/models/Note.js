const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    // _id: { type: mongoose.Types.ObjectId, auto: true },
    name: String,
    color: String,
    pinned: Boolean
}, {
    timestamps: true
}, {
    collection: 'notes'
});

module.exports = mongoose.model('Note', NoteSchema);