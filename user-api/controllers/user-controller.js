var { User } = require('../models/user');

// GET ALL [/users]
const index = (req, res) => {
    User.find().exec((err, users) => {
        res.json(users);
    });
}

// GET BY ID [/users/:id]
const getById = (req, res) => {
    User.findById(req.params.id).exec((err, user) => {
        if (user === null) {
            res.status(404).json({ message: "User Not Found" });
        } else {
            res.json(user);
        }
    })
}


// POST 
const create = (req, res) => {
    var newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) throw err;

        res.json(user);
    });
}

// DELETE
const destroy = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    })
}

// Find user, verify password

const login = (req, res) => {
    User.findOne({ username: req.body.username }, function (err, user) {
        user.verifyPassword(req.body.password, function(err, isMatch) {
            if (isMatch) {
                res.json({ success: true });
            }
            else {
                res.json({ success: false });
            }
        });
    });
}


module.exports = { index, getById, create, destroy, login }