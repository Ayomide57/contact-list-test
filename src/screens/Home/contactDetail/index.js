import React, { } from "react";
import CustomModal from "../../../components/Modal";
import { PropTypes } from "prop-types";

const ContactDetail = (props) => {

  console.log(props.singleContact);
  return (
    <CustomModal
      show={props.detail}
      name={"View Contact"}
      handleClose={props.handleClose}
      modal="view contact"
    >
      <div>
        <p>ID: {props.singleContact.id}</p>
        <p>
          name:{" "}
          {`${props.singleContact.first_name} ${props.singleContact.first_name}`}
        </p>
        <p>Email: {props.singleContact.email}</p>
        <p>Phone Number: {props.singleContact.phone_number}</p>
      </div>
    </CustomModal>
  );
};

ContactDetail.protoTypes = {
  contacts: PropTypes.object.isRequired,
};


export default ContactDetail;
