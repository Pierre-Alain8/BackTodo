const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: 'You need to specifie a name'
    },
    email: {
        type: 'string',
        required: 'You need to specifie a email',
        match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        unique: true
    },
    password: {
        type: 'string',
        required: 'You need to specifie a password'
    },

    listId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }]

    
});

module.exports = mongoose.model('User', userSchema);
