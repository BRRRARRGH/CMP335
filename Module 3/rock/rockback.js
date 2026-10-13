const express = require('express')
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const rocks = [
    { id: 1, color: 'Red', type: 'Igneous', count: 5 },
    { id: 2, color: 'Orange', type: 'Sedimentary', count: 2 },
    { id: 3, color: 'Blue', type: 'Metamorphic', count: 1 }
];

var numRockTypes = rocks.length;

app.get('/', (req, res) =>
{
    res.send('Welcome to the Rock Collection API!');
});
app.get('/api/rocks', (req, res) =>
{
    res.send(rocks);
});

app.get('/api/rocks/:id', (req, res) =>
{
    const rock = rocks.find(r => r.id === parseInt(req.params.id));
    if (!rock) return res.status(404).send('The rock with the given ID was not found.');
    res.send(rock);
});

app.post('/api/rocks', (req, res) =>
{
    const rockType = req.query.type;
    const rockColor = req.query.color;
    const rockCount = parseInt(req.query.count);
    numRockTypes++;
    const rock = {
        id: numRockTypes,
        color: rockColor,
        type: rockType,
        count: rockCount
    };
    const existingRock = rocks.find(r => r.color === rock.color && r.type === rock.type);
    if (existingRock)
    {
        existingRock.count += rock.count;
        console.log(`Updated rock: ${existingRock.color} ${existingRock.type}, new count: ${existingRock.count}`);
    }
    else
    {
        rocks.push(rock);
        console.log(`Added new rock: ${rock.color} ${rock.type}, count: ${rock.count}`);
    }
    res.send(rocks);
});

app.put('/api/rocks/add/:id', (req, res) =>
{
    
    const rock = rocks.find(r => r.id === parseInt(req.params.id));
    if (!rock) return res.status(404).send('The rock with the given ID was not found.');
    rock.count += 1;
    res.send(rocks);
});

app.put('/api/rocks/remove/:id', (req, res) =>
{
    const rock = rocks.find(r => r.id === parseInt(req.params.id));
    if (!rock) return res.status(404).send('The rock with the given ID was not found.');
    rock.count -= 1;
    if (rock.count <= 0)
    {
        const index = rocks.indexOf(rock);
        rocks.splice(index, 1);
    }
    res.send(rocks);
});

app.delete('/api/rocks/:id', (req, res) =>
{
    const rock = rocks.find(r => r.id === parseInt(req.params.id));
    if (!rock) return res.status(404).send('The rock with the given ID was not found.');
    const index = rocks.indexOf(rock);
    rocks.splice(index, 1);
    res.send(rocks);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
