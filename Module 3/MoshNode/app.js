const express = require('express')
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1',  author: 'author1', potatoes: 9 },
    { id: 2, name: 'course2',  author: 'author2', potatoes: 5 },
    { id: 3, name: 'course3',  author: 'author3', potatoes: 8 }
];
app.get('/', (req, res) => 
{
    res.send('Hello World');
});

app.get('/api/courses', (req, res) =>
{
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

app.post('/api/courses', (req, res) =>
{
    if (!req.body.name || req.body.name.length < 3)
    {
        return res.status(400).send('Name is required and should be minimum 3 characters.');
    }
    if (!req.body.author || req.body.author.length < 3)
    {
        return res.status(400).send('Author is required and should be minimum 3 characters.');
    }
    if (!req.body.potatoes || req.body.potatoes < 1)
    {
        return res.status(400).send('Potatoes is required and should be a positive number.');
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
        author: req.body.author,
        potatoes: req.body.potatoes
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    if (!req.body.name || req.body.name.length < 3)
    {
        return res.status(400).send('Name is required and should be minimum 3 characters.');
    }
    course.name = req.body.name;
    res.send(course);
});

app.put('/api/courses/changeAuthor/:id', (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    if (!req.body.author || req.body.author.length < 3)
    {
        return res.status(400).send('Author is required and should be minimum 3 characters.');
    }
    course.author = req.body.author;
    res.send(course);
});

app.put('/api/courses/changePotatoes/:id', (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    if (!req.body.potatoes || req.body.potatoes < 1)
    {
        return res.status(400).send('Potatoes is required and should be a positive number.');
    }
    course.potatoes = req.body.potatoes;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
