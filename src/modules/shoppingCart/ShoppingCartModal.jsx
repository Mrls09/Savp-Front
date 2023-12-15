
import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from 'react';


export const ShoppingCartModal = ({ isOpen, onClose, items }) => {
    return (
      <Modal show={isOpen} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Aquí puedes mostrar la lista de items del carrito */}
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item.nombre}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  