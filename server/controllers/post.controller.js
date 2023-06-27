const db = require("../models");
const {QueryTypes} = require("sequelize");
const Post = db.posts;
const sequelize = db.sequelize

exports.createPost = (req, res) => {

    // Validate request
    if (!req.body.title || !req.body.userId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Post
    const post = {
        title: req.body.title,
        userId: req.body.userId
    };

    // Save Post in the database
    Post.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });
}

exports.getPosts = (req, res) => {
    sequelize.query("SELECT * FROM posts", {
        model: Post,
        mapToModel: true,
        type: QueryTypes.SELECT
    })
        .then((posts)=> {res.send(posts)})
        .catch(err => {res.status(500).send({
            message:
                err.message || "Some error occurred while get the Posts."
        });});
}

exports.getPost = (req, res) => {
    const userId = req.params.id;

    sequelize.query(`SELECT * FROM posts WHERE \"userId\"=${userId}`, {
        model: Post,
        mapToModel: true,
        type: QueryTypes.SELECT
    })
        .then((posts)=> {res.send(posts)})
        .catch(err => {res.status(500).send({
            message:
                err.message || "Some error occurred while get the Posts."
        });});
}

exports.updatePost = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });
}

exports.deletePost = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        });
}

exports.deletePosts = (req, res) => {
    Post.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Posts were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Posts."
            });
        });
}