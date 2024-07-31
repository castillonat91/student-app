import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AddStudentForm = ({ onAddStudent, onEditStudent, onCancelEdit, student }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    photo: '',
    grade: '',
    school: '',
    documentNumber: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id,
        name: student.name,
        photo: student.photo,
        grade: student.grade,
        school: student.school,
        documentNumber: student.documentNumber || '',
      });
    } else {
      setFormData({
        id: '',
        name: '',
        photo: '',
        grade: '',
        school: '',
        documentNumber: '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      onAddStudent(formData);
    } else {
      onAddStudent({ ...formData, id: Date.now() });
    }
    setFormData({
      id: '',
      name: '',
      photo: '',
      grade: '',
      school: '',
      documentNumber: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
      />
      <input
        type="text"
        name="photo"
        value={formData.photo}
        onChange={handleChange}
        placeholder="URL de Foto"
      />
      <input
        type="text"
        name="grade"
        value={formData.grade}
        onChange={handleChange}
        placeholder="Grado"
      />
      <input
        type="text"
        name="school"
        value={formData.school}
        onChange={handleChange}
        placeholder="Colegio"
      />
      <input
        type="text"
        name="documentNumber"
        value={formData.documentNumber}
        onChange={handleChange}
        placeholder="Número de Documento"
      />
      <button type="submit">{formData.id ? 'Actualizar' : 'Agregar'} Estudiante</button>
      {formData.id && <button type="button" onClick={onCancelEdit}>Cancelar</button>}
    </form>
  );
};

AddStudentForm.propTypes = {
  onAddStudent: PropTypes.func.isRequired,
  onEditStudent: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  student: PropTypes.object,
};

export default AddStudentForm;
