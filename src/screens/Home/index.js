import React, {useState} from 'react';
import Layout from '../../components/Layout';
import { Button } from 'react-bootstrap';
import '../../components/Button/button.scss';
import USContact from './USContacts';
import AllContacts from './AllContacts';
import ContactDetail from './contactDetail'


const Home = (props) => {
    const [allContact, showAllContact] = useState(false);
    const [usContact, showUsContact] = useState(false);
    const [detial, showContactDetail] = useState(false);
    const [singleContact, setData] = useState([]);

    const showContactDetailWithData = (data) => {
        setData(data);
        showUsContact(false);
        showAllContact(false);
        showContactDetail(!detial);
    }

    const openOtherContact = (modal) => {
        console.log(modal);
        if (modal === "All Contacts") {
          showUsContact(false);
          showAllContact(true);
        } else {
          showAllContact(false);
          showUsContact(true);
        }
    }

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
        {allContact &&
        <AllContacts
          allContact={allContact}
          showDetail={showContactDetailWithData}
          handleClose={() => showAllContact(!allContact)}
          openOtherContact={openOtherContact}
        />}
            {usContact && <USContact
                usContact={usContact}
                showDetail={showContactDetailWithData}
                handleClose={() => showUsContact(!usContact)}
                openOtherContact={openOtherContact}
            />}
            {detial && <ContactDetail
                detail={detial}
                singleContact={singleContact}
                handleClose={() => {
                    showContactDetail(!detial);
                }}
            />}
      </Layout>
    );
}


export default Home;


