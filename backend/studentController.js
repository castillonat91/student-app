
const connectToDB = require('./db');

async function addStudent(student) {
  try {
    const db = await connectToDB();
    const collection = db.collection('students');
    const result = await collection.insertOne(student);
    return result;
  } catch (error) {
    console.error('Error al añadir estudiante:', error);
    throw error;
  }
}

async function getStudents() {
  try {
    const db = await connectToDB();
    const collection = db.collection('students');
    const students = await collection.find({}).toArray();
    return students;
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    throw error;
  }
}

module.exports = { addStudent, getStudents };
