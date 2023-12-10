import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/authContext';
import AxiosClient from '../../shared/plugins/axios';
import DataTable from 'react-data-table-component';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { Button } from 'react-bootstrap';
import ProductForm from './components/ProductForm';

const ProductScreen = () => {
    const user = useContext(AuthContext);
    const { token } = user;
    const [products, setProducts] = useState([]);
    const [showModalForm, setShowModalForm] = useState(false);

    const getAllProducts = async () => {
        try {
            const response = await AxiosClient({
                url: "/producto/",
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            })
            setProducts(response);
        } catch (error) {
            console.log(error);
        }
    }
    const eliminate = async (id) => {
        try {
            const response = await AxiosClient({
                url: `/producto/${id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (error) {
            console.log(error);
        }finally{
            getAllProducts();
        }
    }
    useEffect(() => {
        getAllProducts();
    }, []);

    const columns = React.useMemo(() => [
        {
            name: "ID",
            selector: (row) => row.id
        },
        {
            name: "Titulo",
            selector: (row) => row.titulo,
            sortable: true,
            fixed: true,
        },
        {
            name: "Descripcion",
            selector: (row) => row.descripcion,
            sortable: true,
            fixed: true,
        },
        {
            name: "ACCIONES",
            cell: (row) => (
                <>
                    <Button
                        variant='warning'
                        type="btn btn-outline-warning btn-circle me-1"
                        size={16}
                    // onClick={() => {
                    //   setIsEditting(true);
                    //   setSelectedFamily(row);
                    // }}
                    ><FeatherIcon icon={'edit'} /></Button>
                    <Button
                        variant='danger'
                        size={15}
                        onClick={() => eliminate(row.id)}
                    ><FeatherIcon icon={'trash'} /></Button>
                </>
            ),
        },
    ])


    return (
        < >
            <div style={{ justifyContent: 'ceneter', alignItems: "center", backgroundColor: "transparent", height: "92vh", padding: 20 }}>
                <div>
                    <div className="App">
                        <DataTable


                            title={

                                <div style={{ display: "flex", flexDirection: "row" }}>

                                    <div style={{ width: "95%", paddingTop: 3 }}>
                                        Productos
                                    </div>

                                    <div >
                                        <FeatherIcon className='DataIcon' icon={'plus'} onClick={() => setShowModalForm(true)} style={{ height: 40, width: 40 }} />
                                    </div>
                                </div>
                            }
                            columns={columns}
                            data={products}
                            pagination
                            highlightOnHover
                            paginationPerPage={8}
                            paginationComponentOptions={{
                                rowsPerPageText: '',
                                noRowsPerPage: true,
                            }}
                        />
                    </div>
                </div>
            </div>
            <ProductForm
            isOpen={showModalForm}
            data={getAllProducts}
            token={token}
            onClose={() => setShowModalForm(false)}/>
        </>
    );
}

export default ProductScreen;
