import React, { useContext, useEffect, useState } from 'react';
import '../../utils/styles/ProfileStyle.css'; // Asegúrate de tener tu archivo de estilos
import { AuthContext } from '../auth/authContext';
import AxiosClient from '../../shared/plugins/axios';

const ProfileUser = () => {
    const user = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    const getMyProducts = async () => {
        try {
            const response = await AxiosClient({
                url:`/renta/user/${user.user.data.id}`,
                method:"GET"
            })
            setProducts(response);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getMyProducts();
    },[]);
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
                    <h2 >{user.user.data.username}</h2>
                    {/* Otra información del usuario, como correo, etc. */}
                </div>
            </div>

            {/* Juegos del usuario */}
            <div className="user-games">
                <h3>Mis Juegos</h3>
                {/* Lista de juegos del usuario */}
                <div className="UserCarrusel">
                    {products.map((product, index) => (
                        <div key={index} className="item" >
                            <img
                                src={`http://localhost:8080/uploads/${product.producto_imagen}`}
                                alt={`Imagen de ${product.titulo}`}
                                style={{ width: '250px', height: '150px' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;
