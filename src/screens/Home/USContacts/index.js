import React, { useEffect, useState, useCallback, useRef } from "react";
import CustomModal from '../../../components/Modal';
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { contactSelector } from "../../../core/services/redux/contacts/index";
import ACTIONS from "../../../core/services/redux/contacts/actionTypes";
import CustomSpinner from "../../../components/Spinner";
import Table from "react-bootstrap/Table";
import './uscontact.scss'


const USContact = (props) => {
    const [contacts, filterContact] = useState([]);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    }, []);

    
    const sendQuery = useCallback(async () => {
        try {
            await props.fetchContacts({
                companyId: 171,
                countryId: 226,
                page: page,
            });

        } catch (err) {
            console.log(err);
        }
    }, [page]);
    
    useEffect(() => {
        sendQuery();
    }, [sendQuery, page]);
    

    useEffect(() => {
            const option = {
              root: null,
              rootMargin: "20px",
              threshold: 0,
            };

      props.uscontacts.uscontacts &&
        filterContact((prev) => [...prev, ...props.uscontacts.uscontacts]);

      const observer = new IntersectionObserver(handleObserver, option);
      console.log(observer);

      if (loader.current) {
        observer.observe(loader.current);
      }
    }, [props.uscontacts.uscontacts, handleObserver]);




    const checkboxState = (event) => {
        if (event.target.checked) {
            const filtered = contacts.filter((contact) => {
                return contact.id % 2 === 0;
            });
            filterContact(filtered);
        } else {
            filterContact(props.uscontacts.uscontacts);
        }
    };

    const onChangeSearch = (event) => {
        if (event.target.value) {
            setSearch(event.target.value);
            props.fetchContacts({
              companyId: 171,
              countryId: 226,
              page: page,
              query: event.target.value,
            });

        } else {
            setSearch(event.target.value);
            props.fetchContacts({
                companyId: 171,
                countryId: 226,
            });
        }
    };
    
  return (
    <CustomModal
      show={props.usContact}
      name={"US Contacts"}
      handleClose={props.handleClose}
      checkboxState={checkboxState}
      onChangeSearch={onChangeSearch}
      search={search}
      openOtherContact={props.openOtherContact}
    >
          {<div className="loader" id="loader">
              <Table striped bordered hover>
                  <thead>
                      <tr>
                          <th>#ID</th>
                          <th>Phone Number</th>
                      </tr>
                  </thead>

                  <tbody>
                      {contacts &&
                          contacts.map((contacts, index) => {
                              return (
                                  <tr key={index} onClick={() => props.showDetail(contacts)}>
                                      <td>{contacts && contacts.id}</td>
                                      <td>{contacts.id && contacts.phone_number}</td>
                                  </tr>
                              );
                          })}
                  </tbody>
              </Table>
              <div ref={loader} />
          </div>}
      {props.uscontacts.isLoading && (
        <CustomSpinner />
      )}
    </CustomModal>
  );
};

USContact.protoTypes = {
  uscontacts: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  uscontacts: contactSelector(state),
});

const mapDispatchToProps = dispatch => ({
    fetchContacts: (params) => {
    dispatch({
      type: ACTIONS.FETCH_US_CONTACT_STARTED,
      params: params,
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(USContact);
