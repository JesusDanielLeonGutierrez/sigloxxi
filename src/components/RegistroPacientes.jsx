import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../assets/css/Registro.css';

export const RegistroPacientes = () => {
  const [formulario, setFormulario] = useState({
    name: '',
    email: '',
    fecha_na: '',
    telefono: '',
    rol_id: '2', // Valor predeterminado: Doctor
  });

  const [errores, setErrores] = useState({
    name: '',
    email: '',
    fecha_na: '',
    telefono: '',
    rol_id: '',
  });

  const [enviado, setEnviado] = useState(false);
  const [token, setToken] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let erroresTemp = {};

    // ... Validaciones ...

    if (Object.keys(erroresTemp).length === 0) {
      try {
        setToken(localStorage.getItem('token').replace(/['"]+/g, ''));
        const headers = {
          'Authorization': `Bearer ${token}`,
        };

        const response = await axios.post('http://127.0.0.1:8000/api/pacientes/crear', formulario, { headers });
        console.log(response.data);
        setEnviado(true);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="registro-container">
      <Navbar />

      <form id="my-form" onSubmit={handleSubmit} className="registro-form">
        <h2>Registros</h2>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        {errores.name && <span className="error">{errores.name}</span>}

        <label htmlFor="fecha-na">Fecha de nacimiento:</label>
        <input type="date" id="fecha-na" name="fecha_na" onChange={handleChange} />
        {errores.fecha_na && <span className="error">{errores.fecha_na}</span>}

        <label htmlFor="telefono">Teléfono:</label>
        <input type="text" id="telefono" name="telefono" onChange={handleChange} />
        {errores.telefono && <span className="error">{errores.telefono}</span>}

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={handleChange} />
        {errores.email && <span className="error">{errores.email}</span>}
        {enviado && <span className="confirmacion">¡Registro exitoso!</span>}

        <button type="submit">Enviar</button>
        <Link to="/" className="boton-regresar">Regresar</Link>
      </form>
    </div>
  );
};

export default RegistroPacientes;