import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/css/Tablas.css';
import Navbar from './Navbar';

function Doctores() {
  const [doctores, setDoctores] = useState([]);
  const [token, setToken] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);



  const fetchDoctores = async () => {
    try {
      const response = await Axios.get('http://127.0.0.1:8000/api/doctores', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = response.data.doctores;
        setDoctores(data);
      } else {
        console.error('Error al obtener doctores');
      }
    } catch (error) {
      console.error('Error al obtener doctores', error);
    }
  };

  useEffect(() => {
    try {
      setToken(localStorage.getItem('token').replace(/['"]+/g, ''));
      fetchDoctores();
    }
    catch (e) {
        setToken(null);
    }
  }, [token]);

  const handleEditarDoctor = (doctor) => {
    setEditingDoctor(doctor);
  };

  const handleGuardarCambios = async (doctorId, fieldName, value) => {
    const editedDoctor = {
      id: doctorId,
      [fieldName]: value,
    };

    try {
      const response = await Axios.patch(`http://127.0.0.1:8000/api/doctores/${doctorId}/update`, editedDoctor, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        // Actualización exitosa en el servidor, actualiza el estado local y desactiva la edición
        setEditingDoctor(null);
        fetchDoctores(); // Actualiza la lista de doctores
      } else {
        console.error('Error al editar el doctor en el servidor');
      }
    } catch (error) {
      console.error('Error al editar el doctor', error);
    }
  };

  const handleEliminarDoctor = async (doctorId) => {
    try {
      const response = await Axios.delete(`http://127.0.0.1:8000/api/doctores/${doctorId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        // Eliminación exitosa en el servidor, actualiza la lista de doctores
        fetchDoctores();
      } else {
        console.error('Error al eliminar el doctor en el servidor');
      }
    } catch (error) {
      console.error('Error al eliminar el doctor', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-center mt-4">Doctores</h1>
      </div>

      {/* Tabla de Doctores */}
      <div>
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th scope="col">Nombre del Doctor</th>
              <th scope="col">Email</th>
              <th scope="col">Fecha de Nacimiento</th>
              <th scope="col">Número de Cédula</th>
              <th scope="col">Número de Teléfono</th>
              <th scope="col">Consultorio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {doctores.map((doctor) => (
              <tr key={doctor.id}>
                <td>
                  {editingDoctor && editingDoctor.id === doctor.id ? (
                    <input
                      type="text"
                      value={doctor.name}
                      onChange={(e) => handleGuardarCambios(doctor.id, 'name', e.target.value)}
                    />
                  ) : (
                    doctor.name
                  )}
                </td>
                <td>
                  {editingDoctor && editingDoctor.id === doctor.id ? (
                    <input
                      type="text"
                      value={doctor.email}
                      onChange={(e) => handleGuardarCambios(doctor.id, 'email', e.target.value)}
                    />
                  ) : (
                    doctor.email
                  )}
                </td>
                <td>
                  {editingDoctor && editingDoctor.id === doctor.id ? (
                    <input
                      type="date"
                      value={doctor.fecha_na}
                      onChange={(e) => handleGuardarCambios(doctor.id, 'fecha_na', e.target.value)}
                    />
                  ) : (
                    doctor.fecha_na
                  )}
                </td>
                <td>
                  {editingDoctor && editingDoctor.id === doctor.id ? (
                    <input
                      type="text"
                      value={doctor.no_cedula}
                      onChange={(e) => handleGuardarCambios(doctor.id, 'no_cedula', e.target.value)}
                    />
                  ) : (
                    doctor.no_cedula
                  )}
                </td>
                <td>
                  {editingDoctor && editingDoctor.id === doctor.id ? (
                    <input
                      type="text"
                      value={doctor.telefono}
                      onChange={(e) => handleGuardarCambios(doctor.id, 'telefono', e.target.value)}
                    />
                  ) : (
                    doctor.telefono
                  )}
                </td>
                <td>
                  {editingDoctor && editingDoctor.id === doctor.id ? (
                    <input
                      type="text"
                      value={doctor.consultorio}
                      onChange={(e) => handleGuardarCambios(doctor.id, 'consultorio', e.target.value)}
                    />
                  ) : (
                    doctor.consultorio
                  )}
                </td>
                <th>
                  {editingDoctor && editingDoctor.id === doctor.id ? (
                    <>
                      <button type="button" className="btn btn-success" onClick={() => handleGuardarCambios(doctor.id)}>Guardar</button>
                      <button type="button" className="btn btn-danger" onClick={() => handleEliminarDoctor(doctor.id)}>Eliminar</button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="btn btn-danger" onClick={() => handleEliminarDoctor(doctor.id)}>Eliminar</button>
                      <button type="button" className="btn btn-warning" onClick={() => handleEditarDoctor(doctor)}>Editar Doctor</button>
                    </>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Fin Tabla de Doctores */}
    </div>
  );
}

export default Doctores;