import React, { useContext, useEffect, useState } from "react";
import "../../utils/styles/ProfileStyle.css";
import { AuthContext } from "../auth/authContext";
import AxiosClient from "../../shared/plugins/axios";
import { Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import EditInfUser from "./EditInfUser"; // Ajusta la ruta según la ubicación real de tu componente
import { URL } from '../../utils/constans'
const ProfileUser = () => {
  const user = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProfile, setEditProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getMyProducts = async () => {
    try {
      const response = await AxiosClient({
        url: `/renta/user/${user.user.data.id}`,
        method: "GET",
      });
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  const findPersonalByUserId = async () => {
    try {
      const response = await AxiosClient({
        url: `/personal/findByUserId/${user.user.data.id}`,
        method: "GET",
      });
      setPersonalInfo(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditInfo = (userData) => {
    setEditProfile(userData);
    setIsEditing(true);
    setShowEditModal(true);
  };

  useEffect(() => {
    document.title = "Perfil";
    getMyProducts();
    findPersonalByUserId();
  }, []);

  const handleEditClick = () => {
    setShowEditModal(!showEditModal);
  };

  return (
    <div className="profile-container">
      <div className="cover-photo">
        <img src={require("../../utils/img/coverPhoto.jpg")} alt="Cover" />
      </div>

      <div className="user-info">
        <div className="profile-picture">
          <img src={require("../../utils/img/fgIcon.png")} alt="Profile" />
        </div>
        <div style={{ display: "flex" }}>
          <h2 className="username">{user.user.data.username}</h2>

          <Button
            variant="warning"
            type="btn btn-outline-warning btn-circle me-1"
            size="10px"
            onClick={() => handleEditInfo(personalInfo)}
          >
            <FeatherIcon icon={"edit"} />
          </Button>
        </div>
        <div className="user-details">
          {personalInfo && (
            <div>
              <p>Nombre: {personalInfo.name}</p>
              <p>Cumpleaños: {personalInfo.birthday}</p>
              <p>Dirección: {personalInfo.address}</p>
            </div>
          )}
        </div>
      </div>

      <div className="user-games">
        <h3>Mis Juegos</h3>
        <div className="UserCarrusel">
          {products.map((product, index) => (
            <div key={index} className="item" style={{ margin: "10px" }}>
              <img
                src={`${URL}:8080/uploads/${product.producto_imagen}`}
                alt={`Imagen de ${product.titulo}`}
                style={{ width: "250px", height: "150px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {showEditModal && (
        <EditInfUser
          isOpen={showEditModal}
          userData={editProfile}
          data={findPersonalByUserId}
          onClose={() => {
            setShowEditModal(false);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default ProfileUser;