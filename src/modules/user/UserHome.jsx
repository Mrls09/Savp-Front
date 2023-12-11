import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../utils/styles/UserStyles.css';
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import { AuthContext } from '../auth/authContext';

const UserHome = () => {
    const user = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const response = await AxiosClient({
                url: "/producto/",
                method: "GET",
            });
            setProducts(response);
        } catch (err) {
            Alert.fire({
                title: "VERIFICAR DATOS",
                text: "USUARIO Y/O CONTRASEÑA INCORRECTOS",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            });
        }
    }

    const openModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const addToCart = () => {
        // Lógica para agregar al carrito (puedes implementar según tus necesidades)
        console.log(`Agregando al carrito: ${selectedProduct?.titulo}`);
        // Puedes enviar esta información al servidor para procesar la acción de agregar al carrito
    }

    return (
        <div className='UserMainContainer'>
            {/* Sección para mostrar imágenes de productos */}
            <div className='UserJuegos'>
                <div>Top juegos</div>
                <div className="UserCarrusel">
                    {products.slice(2, 7).map((product, index) => (
                        <div key={index} className="item" onClick={() => openModal(product)}>
                            <img
                                src={`http://localhost:8080/uploads/${product.imagen}`}
                                alt={`Imagen de ${product.titulo}`}
                                style={{ width: '250px', height: '150px' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='UserJuegos'>
                <div>Recomendados</div>
                <div className="UserCarrusel">
                    {products.slice(2, 7).map((product, index) => (
                        <div key={index} className="item" onClick={() => openModal(product)}>
                            <img
                                src={`http://localhost:8080/uploads/${product.imagen}`}
                                alt={`Imagen de ${product.titulo}`}
                                style={{ width: '250px', height: '150px' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='UserJuegos'>
                <div>Recien añadidos</div>
                <div className="UserCarrusel">
                {products.slice(2, 7).map((product, index) => (
                        <div key={index} className="item" onClick={() => openModal(product)}>
                            <img
                                src={`http://localhost:8080/uploads/${product.imagen}`}
                                alt={`Imagen de ${product.titulo}`}
                                style={{ width: '250px', height: '150px' }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal para mostrar la información detallada del producto */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProduct?.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={`http://localhost:8080/uploads/${selectedProduct?.imagen}`}
                        alt={`Imagen de ${selectedProduct?.titulo}`}
                        style={{ width: '450px', height: '300px' }}
                    />
                    <p>{selectedProduct?.descripcion}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={addToCart}>
                        Agregar al carrito
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserHome;
