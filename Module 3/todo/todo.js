const express = require('express')
const app = express();

app.use(express.json());

const toDoList = [
    { item: 1, description: 'Stats 2.4',  due: '10/11/26', completed: false },
    { item: 2, description: 'English Paper',  due: '10/18/26', completed: false },
    { item: 3, description: 'Project Proposal',  due: '10/25/26', completed: false }
];
app.get('/', (req, res) => 
{
    res.send('Working on my to-do list!');
});

app.get('/api/todos', (req, res) =>
{
    res.send(toDoList);
});

app.get('/api/todos/:item', (req, res) =>
{
    const todo = toDoList.find(t => t.item === parseInt(req.params.item));
    if (!todo) return res.status(404).send('The to-do item with the given ID was not found.');
    res.send(todo);
});

app.post('/api/todos', (req, res) =>
{
    if (!req.body.description || req.body.description.length < 3)
    {
        return res.status(400).send('Description is required and should be minimum 3 characters.');
    }
    if (!req.body.due)
    {
        return res.status(400).send('Due date is required and should be minimum 3 characters.');
    }
    if (!req.body.completed)
    {
        return res.status(400).send('Completion status is required.');
    }
    const todo = {
        item: toDoList.length + 1,
        description: req.body.description,
        due: req.body.due,
        completed: req.body.completed
    };
    toDoList.push(todo);
    res.send(todo);
});

app.put('/api/todos/:item', (req, res) =>
{
    const todo = toDoList.find(t => t.item === parseInt(req.params.item));
    if (!todo) return res.status(404).send('The to-do item with the given ID was not found.');

    if (todo.completed === true)
    {
        return res.status(400).send('This to-do item has already been completed.');
    }
    todo.completed = true;
    res.send(todo);
});

app.delete('/api/todos/:item', (req, res) =>
{
    const todo = toDoList.find(t => t.item === parseInt(req.params.item));
    if (!todo) return res.status(404).send('The to-do item with the given ID was not found.');

    const index = toDoList.indexOf(todo);
    toDoList.splice(index, 1);
    res.send(todo);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
