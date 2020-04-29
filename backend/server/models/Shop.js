const mongoose = require('mongoose');


const ShopSingle = mongoose.Schema({
    name: String,
    completed: Boolean,

});

const ShopListSchema = mongoose.Schema({
    // _id: { type: mongoose.Types.ObjectId, auto: true },
    name: String,
    pinned: Boolean,
    items: [{
        name: String,
        crossed: Boolean
    }],
    _id: { type: mongoose.Types.ObjectId, auto: true }
}, {
    timestamps: true
}, {
    collection: 'shop'
});

module.exports = mongoose.model('ShopSingle', ShopSingle);

module.exports = mongoose.model('ShopList', ShopListSchema);