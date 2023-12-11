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
    const [items, setItems] = useState([]);
    const [selectedItem , setSelectedItem ] = useState();
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
    const getItemsByProduct = async (productoId) => {
        try {
            const response = await AxiosClient({
                url: `/item/producto/${productoId}`,
                method: "GET"
            })
            setItems(response);
        } catch (error) {
            console.log(error)
        }
    }
    const openModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
        getItemsByProduct(product.id)
    }

    const closeModal = () => {
        setSelectedItem({});
        setSelectedProduct({})
        setShowModal(false);
    }

    const addToCart =  async() => {
        // Lógica para agregar al carrito (puedes implementar según tus necesidades)
        console.log(`Agregando al carrito: ${selectedProduct?.titulo}`);
        try {
            const response = await AxiosClient({
                url:"/renta/",
                method:"POST",
                data:{
                    userId: user.user.data.id,
                    itemId: selectedItem,
                    cajeroId: 2
                }
            })
            if(!response.error){
                const res = await AxiosClient({
                    url:`/item/status/${selectedItem}`,
                    method: "PUT"
                })
                console.log(res);
                Alert.fire({
                  title: "ITEM AÑADIDO EXITOSAMENTE",
                  text: "El item fue añadido con exito a tus productos",
                  icon: "check",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Aceptar",
              });
            };
        } catch (error) {
            Alert.fire({
                title: "ERROR AL AÑADIRO ITEM",
                text: "Hubo un error al añadir item, intente otra vez",
                icon: "x",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            });
        }finally{
            closeModal();
        }
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
                    <p> <strong>Descripcion : </strong>{selectedProduct?.descripcion}</p>
                    {/* Select para plataformas */}
                    <label htmlFor="platform">Seleccionar plataforma:</label>
                    <select
                        id="platform"
                        name="platform"
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                    >
                        <option value="">-- Seleccionar --</option>
                        {items.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.plataforma}
                            </option>
                        ))}
                    </select>
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
