import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Navbar/Navbar";
import CreateContact from "./components/Contacts/CreateContact";
import ViewContacts from "./components/Contacts/ViewContacts";

import { checkUserLoginStatus } from "./utils/auth";
import { getAllContacts, deleteContact } from "./utils/api";

const App = () => {
  const navigate = useNavigate();
  // this will store the details of logged in user
  const [loggedInUser, setLoggedInUser] = useState(null);

  
  // at the start of app -> check whether user is already logged in
  useEffect(() => {
    checkUserLoginStatus().then((userStatus) => {
      if (userStatus.error) {
        navigate("/login",{replace:true});
        return;
      }
      setLoggedInUser(userStatus);
      navigate("/view-contacts", { replace: true });
    });
  }, []);
  
  // maintaining state of all the contacts
  const [contacts, setContacts] = useState([]);
  console.log(contacts);
  
  // filter the contacts according to the loggedInUser
  useEffect(() => {
    if (loggedInUser) {
      getAllContacts().then((contacts) => {
        const filteredContact = contacts.filter(
          (contact) => contact.postedBy === loggedInUser._id
        );
        setContacts(filteredContact);
      });
    }
  }, [loggedInUser]);

  const handleLogin = (userDetails) => {
    setLoggedInUser(userDetails);
    navigate("/view-contacts", { replace: true });
  };

  const handleLogOut = () => {
    setLoggedInUser(null);
    navigate("/login", { replace: true });
  };

  //contact creation, deletion operations
  const handleNewContact = (newContact) => {
    console.log(newContact);
    setContacts([...contacts, newContact]);
  };

  const handleContactDelete = async (id) => {
    const result = await deleteContact(id);
    if (result.success) {
      const filteredContact = contacts.filter(contact => contact._id !== id);
      setContacts(filteredContact);
      toast.success(result.success)
    }
    else 
      toast.error(result.error)
  }

  const handleContactUpdate = async(id, contactDetails) => {
    console.log(id, contactDetails);
    const foundContact = contacts.filter(contact => contact._id === id);
    const remainingContacts = contacts.filter(contact => contact._id != id);
    const index = contacts.indexOf(foundContact[0]);
    contacts.splice(index,1);
    contactDetails._id = id;
    setContacts([contactDetails, ...remainingContacts]);
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      {loggedInUser && (
        <Navbar loggedInUser={loggedInUser} onLogOut={handleLogOut} />
      )}

      <Routes>
        {!loggedInUser && (
          <Route path="/" element={<Navigate to="/login" replace />} />
        )}
        <Route
          path="/login"
          element={<Login loggedInUser={loggedInUser} onLogIn={handleLogin} />}
        />

        <Route path="/register" element={<Register />} />

        <Route
          path="/create-contact"
          element={<CreateContact onContactAdd={handleNewContact} />}
        />
        <Route
          path="/view-contacts"
          element={
            <ViewContacts contacts={contacts} loggedInUser={loggedInUser} onContactDelete={handleContactDelete} onContactUpdate={handleContactUpdate}/>
          }
        />
      </Routes>
    </>
  );
};

export default App;
