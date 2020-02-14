const mongoose = require('mongoose');

let tasksSchema = new mongoose.Schema({

    name: {
        type: 'string', 
        required: 'You need to specifie a name for your tasks'
    },

    done: {
        type: 'boolean'
    }, 

    date: {
        type: 'date', 
        default: Date.now
    }, 

    listId:[{

        type: mongoose.Schema.Types.ObjectId, 
        ref:"List"
    }]

})

module.exports = mongoose.model('Tasks',tasksSchema);