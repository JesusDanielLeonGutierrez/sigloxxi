import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Elimina el token de la localStorage u realiza cualquier otra acción necesaria
    localStorage.removeItem('token');
    alert('¡Te has desconectado!');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
