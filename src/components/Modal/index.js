import React from 'react';
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";


const CustomModal = ({
  children,
  show,
  handleClose,
  name,
  search,
  checkboxState,
  onChangeSearch,
  modal,
  openOtherContact,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modal !== "view contact" ? (
          <div>
            <Form.Control
              type="text"
              name="search"
              value={search}
              onChange={(event) => onChangeSearch(event)}
            />
            <br />

            {children}
            <Form.Check
              type={"checkbox"}
              id={`default-checkbox}`}
              label={`Only even`}
              name={"even"}
              onChange={(event) => checkboxState(event)}
            />
          </div>
        ) : (
          children
        )}
      </Modal.Body>
      <Modal.Footer>
        {modal !== "view contact" && (
          <Button
            variant="primary"
            size="lg"
            className="ButtonA"
            onClick={() => openOtherContact("All Contacts")}
          >
            All Contacts
          </Button>
        )}
        {modal !== "view contact" && (
          <Button
            variant="primary"
            size="lg"
            className="ButtonB"
            onClick={() => openOtherContact("US Contacts")}
          >
            US Contacts
          </Button>
        )}
        <Button variant="primary" onClick={handleClose} size="lg">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;