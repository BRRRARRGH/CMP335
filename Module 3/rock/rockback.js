const express = require('express') //gets express
const app = express(); //creates express app
const cors = require('cors'); //gets cors --> cors was needed for post I believe. Ran into issues without cors
app.use(express.json());// Gets express to use JSON
app.use(cors());//gets express to use cors policy

const rocks = [ //rock array
    { id: 1, color: 'Red', type: 'Igneous', count: 5 },
    { id: 2, color: 'Orange', type: 'Sedimentary', count: 2 },
    { id: 3, color: 'Blue', type: 'Metamorphic', count: 1 }
];

var numRockTypes = rocks.length; //ID accumulator

app.get('/', (req, res) => //root route
{
    res.send('Welcome to the Rock Collection API!');
});
app.get('/api/rocks', (req, res) => //route to get all rocks
{
    res.send(rocks);
});

app.get('/api/rocks/:id', (req, res) => //route to get individual rock
{
    const rock = rocks.find(r => r.id === parseInt(req.params.id));
    if (!rock) return res.status(404).send('The rock with the given ID was not found.');
    res.send(rock);
});

app.post('/api/rocks', (req, res) => //route to add a rock
{
    const rockType = req.query.type; //gets type via query
    const rockColor = req.query.color; //gets color via query
    const rockCount = parseInt(req.query.count); //gets count via query
    numRockTypes++; //accumulates rockTypes
    const rock = { //creates rock obj
        id: numRockTypes,
        color: rockColor,
        type: rockType,
        count: rockCount
    };
    const existingRock = rocks.find(r => r.color === rock.color && r.type === rock.type);
    if (existingRock) //if rock exists, adds count to original rock
    {
        existingRock.count += rock.count;
        console.log(`Updated rock: ${existingRock.color} ${existingRock.type}, new count: ${existingRock.count}`);
    }
    else //else, pushes new obj
    {
        rocks.push(rock);
        console.log(`Added new rock: ${rock.color} ${rock.type}, count: ${rock.count}`);
    }
    res.send(rocks);
});

app.put('/api/rocks/add/:id', (req, res) => //route to add a rock count to an existing rock
{
    
    const rock = rocks.find(r => r.id === parseInt(req.params.id));
    if (!rock) return res.status(404).send('The rock with the given ID was not found.');
    rock.count += 1;
    res.send(rocks);
});

app.put('/api/rocks/remove/:id', (req, res) => //route to remove a rock count from an existing rock
{
    const rock = rocks.find(r => r.id === parseInt(req.params.id));
    if (!rock) return res.status(404).send('The rock with the given ID was not found.');
    rock.count -= 1;
    if (rock.count <= 0) //if count is 0 or less, removes rock from array
    {
        const index = rocks.indexOf(rock);
        rocks.splice(index, 1);
    }
    res.send(rocks);
});

app.delete('/api/rocks/:id', (req, res) => //route to delete a rock from the array
{
    const rock = rocks.find(r => r.id === parseInt(req.params.id));
    if (!rock) return res.status(404).send('The rock with the given ID was not found.');
    const index = rocks.indexOf(rock);
    rocks.splice(index, 1);
    res.send(rocks);
});

const port = process.env.PORT || 3000; //creates port variable
app.listen(port, () => console.log(`Listening on port ${port}...`)); //sets express to listen on port variable and logs to console
