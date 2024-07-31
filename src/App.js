import React, { useState } from 'react';
import './App.css'; 
import AddStudentForm from './components/AddStudentForm';
import StudentCard from './components/StudentCard';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleAddStudent = async (newStudent) => {
    if (editingStudent) {
      const updatedStudents = students.map(student =>
        student.id === editingStudent.id ? newStudent : student
      );
      setStudents(updatedStudents);
      setEditingStudent(null); 
    } else {
      newStudent.id = Date.now();
      setStudents([...students, newStudent]);
      setEditingStudent(null); 
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const cancelEdit = () => {
    setEditingStudent(null);
  };

  const handleDeleteStudent = async (id) => {
    try {
      await fetch(`http://localhost:5000/delete-student/${id}`, {
        method: 'DELETE',
      });

      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
    }
  };

  return (
    <div className="App">
      <div className="AddStudentForm">
        <AddStudentForm
          onAddStudent={handleAddStudent}
          onEditStudent={handleEditStudent}
          onCancelEdit={cancelEdit}
          student={editingStudent}
        />
      </div>

      <div className="student-cards">
        {students.map(student => (
          <div className="StudentCard" key={student.id}>
            <img src={student.photo} alt={`${student.name}'s photo`} />
            <h3>{student.name}</h3>
            <div className="details">
              <p><strong>Grado:</strong> {student.grade || 'No disponible'}</p>
              <p><strong>Colegio:</strong> {student.school || 'No disponible'}</p>
              <p><strong>Número de Documento:</strong> {student.documentNumber || 'No disponible'}</p>
            </div>
            <button onClick={() => handleEditStudent(student)}>Editar</button>
            <button onClick={() => handleDeleteStudent(student.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
