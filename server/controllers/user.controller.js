const db = require("../models");
const {QueryTypes} = require("sequelize");
const {query} = require("express");
const User = db.users;
const sequelize = db.sequelize

// Create and Save a new User
exports.createUser = (req, res) => {

    // Validate request
    if (!req.body.name || !req.body.birthday || !req.body.coefficient) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const user = {
        name: req.body.name,
        birthday: req.body.birthday,
        coefficient: req.body.coefficient
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Get Count Users from the database.
exports.getCountUsers = (req, res) => {

    const query = `SELECT COUNT(*) FROM users`

    sequelize.query(query, {
        type: QueryTypes.SELECT
    })
        .then((users)=> {res.send(users)})
        .catch(err => {res.status(500).send({
            message:
                err.message || "Some error occurred while get the Users."
        });});
};

// Get Users from the database.
exports.getUsers = (req, res) => {

    const { start, end } = req.query
    //const { page, limit } = req.query

    const limit = end - start
    const offset = Number(start)

    let query = ''

    if (start !== undefined || end !== undefined){
        query = `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`
    } else {
        query = `SELECT * FROM users`
    }

    sequelize.query(query, {
        model: User,
        mapToModel: true,
        type: QueryTypes.SELECT
    })
        .then((users)=> {res.send(users)})
        .catch(err => {res.status(500).send({
        message:
            err.message || "Some error occurred while get the Users."
    });});
};

// Get a single User with an id
exports.getUser = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User by the id in the request
exports.updateUser = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteUsers = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Users."
            });
        });
};