import React from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import AxiosClient from '../../../shared/plugins/axios';
import { Button, Col, FormGroup, Modal, Row, Form, Alert } from 'react-bootstrap';

const ProductForm = ({isOpen , data , onClose, token}) => {
    const form = useFormik({
        initialValues: {
            titulo: "",
            descripcion: ""
        },
        validationSchema: yup.object().shape({
            titulo: yup.string().required("Campo obligatorio"),
            descripcion: yup.string().required("Campo obligatorio")

        }),
        onSubmit: async (values) => {
            try {
                const response = await AxiosClient({
                    method: "POST",
                    url: "/producto/",
                    data: JSON.stringify(values),
                    headers: { Authorization: `Bearer ${token}` }
                })
                if(!response.error){
                    data();
                    handleClose();
                }
            } catch (error) {
                console.log(error);
            }
        }
    })

    const handleClose = () => {
        form.resetForm();
        onClose();
    }
    return (
        <Modal backdrop="static" show={isOpen} onHide={handleClose} keyboard={false}>
            <Modal.Header>
                <Modal.Title>Registrar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={form.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="titulo">Titulo</Form.Label>
                        <Form.Control
                            name="titulo"
                            placeholder=""
                            value={form.values.titulo}
                            onChange={form.handleChange}
                        />
                        {form.errors.titulo && (
                            <span className="error-text">{form.errors.titulo}</span>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="descripcion">Descripcion</Form.Label>
                        <Form.Control
                            name="descripcion"
                            placeholder=""
                            value={form.values.descripcion}
                            onChange={form.handleChange}
                        />
                        {form.errors.descripcion && (
                            <span className="error-text">{form.errors.descripcion}</span>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col className="text-end">
                                <Button
                                    variant="outline-danger"
                                    className="me-2"
                                    onClick={handleClose}
                                >
                                    &nbsp;Cancelar
                                </Button>
                                <Button variant="outline-success" type="submit">
                                    &nbsp;Guardar
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ProductForm;
