const express = require("express");
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')

const cors = require("cors");
const db = require("./models/index");

const app = express();

let corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// If the table exists but does not match the model, use the option {force: true}
// db.sequelize.sync({force: true})
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.use('/api/user/', userRouter)
app.use('/api/post/', postRouter)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});