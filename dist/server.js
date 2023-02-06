"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const date = require(__dirname + '/date.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const password = process.env.MONGODB_PASSWORD;
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const mongodb_url = `mongodb+srv://trnprtr24:${password}@cluster0.uwwvchm.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongodb_url);
const todoSchema = new mongoose_1.Schema({
    task: String,
    isDone: Boolean,
    taskTitle: String,
    date: { type: Date, default: Date.now }
});
const Todo = mongoose.model('Todo', todoSchema);
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.set('view engine', 'ejs');
const toDay = date.getDateNow();
const todoSchool = new Set();
app.get('/', (request, response) => {
    Todo.find({ taskTitle: 'Home' }, (err, todoHome) => {
        if (err)
            response.send(err);
        else
            response.render('index', { today: toDay, tasks: todoHome, taskTitle: "Home" });
    });
});
app.get('/school', (request, response) => {
    Todo.find({ taskTitle: 'School' }, (err, todoHome) => {
        if (err)
            response.send(err);
        else
            response.render('index', { today: toDay, tasks: todoHome, taskTitle: "School" });
    });
});
app.post('/', (request, response) => {
    let path = '/';
    const newTask = request.body.newTask;
    const taskType = request.body.type;
    if (request.body.type === 'School') {
        path = 'school';
    }
    if (request.body.isDone !== '' && newTask === '' && request.body.delete === undefined) {
        const update_id = request.body.isDone;
        Todo.findOneAndUpdate({ _id: update_id }, [{ $set: { isDone: { $not: "$isDone" } } }], () => {
            response.redirect(path);
        });
    }
    if (newTask !== '') {
        const task = new Todo({
            task: newTask,
            isDone: false,
            taskTitle: taskType
        });
        task.save();
        response.redirect(path);
    }
    if (request.body.delete !== undefined) {
        const delete_id = request.body.delete;
        Todo.findByIdAndDelete(delete_id, (err) => {
            if (err) {
                response.send(err);
            }
            else {
                response.redirect(path);
            }
        });
    }
});
app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=server.js.map