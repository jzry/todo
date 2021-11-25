import create from "./lists/create.js";
import read from "./lists/read.js";
import update from "./lists/update.js";
import remove from "./lists/delete.js";

import createTask from "./lists/tasks/create.js"
import deleteTask from "./lists/tasks/delete.js"

const tasks = {
    create: createTask,
    remove: deleteTask
};

export default {create, read, update, remove, tasks}