const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

let students = [
  // Aquí puedes añadir datos iniciales o dejarlo vacío.
];

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/add-student', (req, res) => {
  const newStudent = req.body;
  newStudent.id = newStudent.id || Date.now(); // Asigna un ID si no tiene
  students.push(newStudent);
  res.json(newStudent);
});

app.put('/update-student/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedStudent = req.body;
  updatedStudent.id = id;
  students = students.map(student => (student.id === id ? updatedStudent : student));
  res.json(updatedStudent);
});

app.delete('/delete-student/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  students = students.filter(student => student.id !== id);
  res.status(204).end();
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
