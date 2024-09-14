const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const users = [
    { id: 1, name: 'Carmela', email: 'mela@gmail.com', age: 25, salary: 25000 },
    { id: 2, name: 'Joseph', email: 'joey@yahoo.com', age: 30, salary: 45000 },
    { id: 3, name: 'James', email: 'james@msn.com', age: 28, salary: 38000 },
    { id: 4, name: 'John', email: 'john@gmail.com', age: 25, salary: 25000 },
    { id: 5, name: 'Frank', email: 'frank@yahoo.com', age: 45, salary: 45000 },
    { id: 6, name: 'Alex', email: 'alex@msn.com', age: 21, salary: 33000 }
];

app.get('/', (req, res) => {
    res.send('Available Routes: /api/users, /api/users/:id');
});

app.get('/api/users', (req, res) => {
    res.send(users);
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.send(user);
});

app.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.age || !req.body.salary) {
        return res.status(400).send('All fields (name, email, age, salary) are required');
    }

    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        age: parseInt(req.body.age),
        salary: parseInt(req.body.salary)
    };
    users.push(user);
    res.status(201).send(user);
});

app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    if (!req.body.name || !req.body.email || !req.body.age || !req.body.salary) {
        return res.status(400).send('All fields (name, email, age, salary) are required');
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.age = parseInt(req.body.age);
    user.salary = parseInt(req.body.salary);

    res.send(user);
});

app.delete('/api/delete/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
});

app.listen(3000, () => console.log('Listening on port 3000'));
