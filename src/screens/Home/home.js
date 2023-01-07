import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Button } from "react-bootstrap";
import "../../components/Button/button.scss";
import CustomModal from "../../components/Modal";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { contactSelector } from "../../core/services/redux/contacts/index";
import ACTIONS from "../../core/services/redux/contacts/actionTypes";
import USContact from "./USContacts";

const Home = (props) => {
  const [allContact, showAllContact] = useState(false);
  const [usContact, showUsContact] = useState(false);
  const [search, setSearch] = useState("");
  const [contacts, filterContact] = useState([]);

  useEffect(() => {
    props.fetchContacts();
  }, []);

  useEffect(() => {
    filterContact(props.contacts.contacts.contacts_ids);
  }, [props.contacts.contacts.contacts_ids]);

  const checkboxState = (event) => {
    if (event.target.checked) {
      const filtered = contacts.filter((contact) => {
        return contact % 2 === 0;
      });
      filterContact(filtered);
    } else {
      filterContact(props.contacts.contacts.contacts_ids);
    }
  };

  const onChangeSearch = (event) => {
    if (event.target.value) {
      setSearch(event.target.value);
      const filtered = contacts.filter((contact) => {
        return contact.first_name.search(event.target.value) === 0;
      });
      filterContact(filtered);
    } else {
      setSearch(event.target.value);
      filterContact(props.contacts.contacts.contacts_ids);
    }
  };
  console.log(props.contacts.contacts.contacts);

  return (
    <Layout>
      <div className="container">
        <Button
          variant="primary"
          size="lg"
          className="ButtonA"
          onClick={() => showAllContact(!allContact)}
        >
          All Contacts
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="ButtonB"
          onClick={() => showUsContact(!usContact)}
        >
          US Contacts
        </Button>
      </div>
      <CustomModal
        show={allContact}
        name={"All Contacts"}
        handleClose={() => showAllContact(!allContact)}
        checkboxState={checkboxState}
        onChangeSearch={onChangeSearch}
        search={search}
      >
        <tbody>
          {props.contacts.contacts.contacts_ids &&
            props.contacts.contacts.contacts &&
            contacts &&
            contacts.map((contacts_id) => {
              return (
                <tr key={contacts_id}>
                  <td>{props.contacts.contacts.contacts[contacts_id].id}</td>
                  <td>
                    {props.contacts.contacts.contacts[contacts_id].phone_number}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </CustomModal>
      {props.contacts.contacts.contacts_ids &&
        props.contacts.contacts.contacts &&
        contacts && (
          <USContact
            usContact={usContact}
            handleClose={() => {
              showUsContact(!usContact);
            }}
            checkboxState={checkboxState}
            onChangeSearch={onChangeSearch}
            search={search}
            contacts={props.contacts.contacts.contacts}
            contacts_ids={props.contacts.contacts.contacts_id}
          />
        )}
    </Layout>
  );
};

Home.protoTypes = {
  contacts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contacts: contactSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchContacts: () => {
    dispatch({
      type: ACTIONS.FETCH_CONTACT_STARTED,
      params: { companyId: 171 },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
