const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect("mongodb://localhost:27017/testdb").then(
    () => { console.log('Database connection is successful') },
    err => { console.log('Error when connecting to the database' + err) }
);
mongoose.set('useFindAndModify', false);

const app = express();
app.use(express.static('public'));

//Middleware
app.use(bodyParser.json());
app.use(cors());


const Note = require('./models/Note');
const Todo = require('./models/Todo');
const Shop = require('./models/Shop');






var router = express.Router();



app.use('/notes', (req, res) => {
    Note.find((err, notes) => {
        if (err) {
            console.log(err);
        } else {
            res.json(notes);
            // console.log(res.json(notes))
        }
    });
});

app.use('/create', (req, res) => {
    var note = new Note(req.body);
    console.log(note)
    note.save().then(note => {
            res.status(200).json({ 'message': 'Note successfully added ', "note": note });
        })
        .catch(err => {
            res.status(400).send("Error when saving to database");
        });
});


app.use('/delete', (req, res) => {
    Note.findByIdAndRemove({ _id: req.body._id }, (err, noteres) => {
        if (err) res.json(err);
        else res.json({ 'message': 'Note successfully removed', 'note': noteres });
    });
});

app.use('/update', (req, res) => {
    Note.findByIdAndUpdate({ _id: req.body.data._id }, { pinned: req.body.data.pinned }, (err, noteres) => {
        if (err) res.json(err);
        else res.json({ 'message': 'Note successfully updated', 'note': noteres });
    });

});


app.use('/todos', (req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
            // console.log(res.json(notes))
        }
    });
});

app.use('/createtodo', (req, res) => {
    var todo = new Todo(req.body);
    todo.save().then(todo => {
            res.status(200).json({ 'message': 'Todo successfully added ', "todo": todo });
        })
        .catch(err => {
            res.status(400).send("Error when saving to database");
        });
});

app.use('/deletetodo', (req, res) => {
    Todo.findByIdAndRemove({ _id: req.body._id }, (err, todores) => {
        if (err) res.json(err);
        else res.json({ 'message': 'Todo successfully removed', 'todo': todores });
    });
});

app.use('/updatetodo', (req, res) => {
    Todo.findByIdAndUpdate({ _id: req.body.data._id }, { completed: req.body.data.completed }, (err, todores) => {
        if (err) res.json(err);
        else res.json({ 'message': 'Todo successfully updated', 'todo': todores });
    });

});

app.use('/pintodo', (req, res) => {
    Todo.findByIdAndUpdate({ _id: req.body.data._id }, { pinned: req.body.data.pinned }, (err, todores) => {
        if (err) res.json(err);
        else res.json({ 'message': 'Todo successfully updated', 'todo': todores });
    });

});

app.use('/shop', (req, res) => {
    Shop.find((err, todos) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
            // console.log(res.json(notes))
        }
    });
});


app.use('/createshop', (req, res) => {
    var shop = new Shop(req.body);
    shop.save().then(todo => {
            res.status(200).json({ 'message': 'Shop list successfully added ', "shop": shop });
        })
        .catch(err => {
            res.status(400).send("Error when saving to database");
        });
});

app.use('/updateshop', (req, res) => {
    Shop.findByIdAndUpdate({ _id: req.body.data._id }, { items: req.body.data.items }, (err, shopres) => {
        if (err) res.json(err);
        else res.json({ 'message': 'Shop list successfully updated', 'shop': shopres });
    });

});

app.use('/pinShop', (req, res) => {
    Shop.findByIdAndUpdate({ _id: req.body.data._id }, { pinned: req.body.data.pinned }, (err, shopres) => {
        if (err) res.json(err);
        else res.json({ 'message': 'Shop list successfully updated', 'shop': shopres });
    });

});

app.use('/deleteshop', (req, res) => {
    Shop.findByIdAndRemove({ _id: req.body._id }, (err, shopres) => {
        if (err) res.json(err);
        else res.json({ 'message': 'SHop list successfully removed', 'shop': shopres });
    });
});


app.use('/', (req, res) => {
    res.send('hello');
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server on port ${port}`));