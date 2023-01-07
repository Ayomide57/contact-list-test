import React, { useEffect, useState, useCallback, useRef } from "react";
import CustomModal from "../../../components/Modal";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { contactSelector } from "../../../core/services/redux/contacts/index";
import ACTIONS from "../../../core/services/redux/contacts/actionTypes";
import Table from "react-bootstrap/Table";
import CustomSpinner from "../../../components/Spinner";
import "./allcontacts.scss";

const AllContact = (props) => {
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

          props.contacts.contacts &&
            filterContact((prev) => [...prev, ...props.contacts.contacts]);

          const observer = new IntersectionObserver(handleObserver, option);
          console.log(observer);

          if (loader.current) {
            observer.observe(loader.current);
          }
        }, [props.contacts.contacts, handleObserver]);



  const checkboxState = (event) => {
    if (event.target.checked) {
      const filtered = contacts.filter((contact) => {
        return contact.id % 2 === 0;
      });
      filterContact(filtered);
    } else {
      filterContact(props.contacts.contacts);
    }
  };

  const onChangeSearch = (event) => {
    if (event.target.value) {
      setSearch(event.target.value);
      props.fetchContacts({
        companyId: 171,
        page: page,
        query: event.target.value,
      });
    } else {
      setSearch(event.target.value);
      props.fetchContacts({
        companyId: 171,
      });
    }
  };

  return (
    <CustomModal
      show={props.allContact}
      name={"All Contacts"}
      handleClose={props.handleClose}
      checkboxState={checkboxState}
      onChangeSearch={onChangeSearch}
      search={search}
      openOtherContact={props.openOtherContact}
    >
      
        <div className="loader" id="loader">
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
                      <td>{contacts.id && contacts.id}</td>
                      <td>{contacts.id && contacts.phone_number}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div ref={loader} />
        </div>
      {props.contacts.isLoading && (
        <CustomSpinner />
      )}
    </CustomModal>
  );
};

AllContact.protoTypes = {
  contacts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contacts: contactSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchContacts: (params) => {
    dispatch({
      type: ACTIONS.FETCH_CONTACT_STARTED,
      params: params,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllContact);
