import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateOrderItem from "./CreateOrderItem";
import EditOrderItem from "./EditOrderItem";
import OrderDetails from "./OrderDetails";
import OrderRecevedDetails from "./OrderRecevedDetails";

const OrderItemModal = ({ handleClose, show, clickValue, paramId }) => {

  



  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          className=" text-white"
          style={{ backgroundColor: "#3f4d67" }}
        >
          <Modal.Title>{clickValue}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Add New Item Order" && (
            <CreateOrderItem handleClose={handleClose} />
          )}
          {clickValue === "Order Information" && (
            <OrderDetails handleClose={handleClose} values={ paramId}  />
          )}
          {clickValue === "Edit Book Item" && (
            <EditOrderItem handleClose={handleClose} param={paramId} />
          )}
          {clickValue === "Receved Information" && (
            <OrderRecevedDetails handleClose={handleClose} values={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(OrderItemModal);
