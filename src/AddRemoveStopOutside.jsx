// AddRemoveStop.js
import React, { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './main.css'

const AddRemoveStop = ({ onUpdate }) => {
  const [fields, setFields] = useState([{ label: "Stop", type: "text" }]);
  const [start, setStart] = useState("");
  const navigate = useNavigate();

  const addField = () => {
    setFields([...fields, { label: "Stop", type: "text" }]);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleChange = (index, event) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    setFields(updatedFields);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onUpdate(start, fields.map(field => field.value));
    navigate('/GetDirectionsMapOver');
  };

  return (
    <div>
      <FloatingLabel controlId="start" label="Start">
        <Form.Control
          className="w-90"
          type="text"
          placeholder="Start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </FloatingLabel>
      {fields.map((field, index) => (
        <div key={index}>
          <FloatingLabel controlId={`stop${index}`} label="Stop">
            <Form.Control
              className="w-100"
              type="text"
              placeholder="Stop"
              value={field.value || ""}
              onChange={(e) => handleChange(index, e)}
            />
            <Button variant="outline-danger" onClick={() => removeField(index)}>
              X
            </Button>
          </FloatingLabel>
        </div>
      ))}
      <Button variant="primary" className="addbutton" onClick={addField}>+</Button>
      <p>
      <Button className="success"  onClick={handleFormSubmit}>Generate Smart Route</Button>
      </p>
    </div>
  );
};

export default AddRemoveStop;
