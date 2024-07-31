import React from 'react';
import PropTypes from 'prop-types';

const StudentCard = ({ id, name, photo, details, onEdit, onDelete }) => {
  return (
    <div className="student-card">
      <img src={photo} alt={name} />
      <h2>{name}</h2>
      <p>Grade: {details.grade}</p>
      <p>School: {details.school}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

StudentCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  details: PropTypes.shape({
    grade: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StudentCard;
