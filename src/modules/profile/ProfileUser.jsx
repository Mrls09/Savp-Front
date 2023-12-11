import React from 'react';
import '../../utils/styles/ProfileStyle.css'; // Asegúrate de tener tu archivo de estilos

const ProfileUser = () => {
  return (
    <div className="profile-container">
      {/* Portada */}
      <div className="cover-photo">
        {/* Contenido de la portada */}
      </div>

      {/* Información del usuario */}
      <div className="user-info">
        {/* Imagen de usuario */}
        <div className="profile-picture">
          <img src={require('../../utils/img/fgIcon.png')} alt="Profile" />
        </div>

        {/* Nombre del usuario y otra información */}
        <div className="user-details">
          <h2>Nombre del Usuario</h2>
          {/* Otra información del usuario, como correo, etc. */}
        </div>
      </div>

      {/* Juegos del usuario */}
      <div className="user-games">
        <h3>Mis Juegos</h3>
        {/* Lista de juegos del usuario */}
        <ul>
          <li>Juego 1</li>
          <li>Juego 2</li>
          {/* Agrega más elementos según sea necesario */}
        </ul>
      </div>
    </div>
  );
}

export default ProfileUser;
