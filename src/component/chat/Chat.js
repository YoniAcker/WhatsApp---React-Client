import "./Chat.css";
import RightSide from "../right-side/RightSide";
import LeftSide from "../left-side/LeftSide";
import AddContactModal from "../add-contact-modal/AddContactModal";
import LogOutModal from "../log-out-modal/LogOutModal";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import io from "socket.io-client";

function Chat({ token, username }) {
  const socket = io("http://localhost:5000");
  const [contactList, SetContactList] = useState([]);
  const [selected, SetSelected] = useState(null);
  const UpdateContact = function (contact, message) {
    let contacts = contactList;
    contact.lastMessage = message;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].username === contact.username) {
        contacts.splice(i, 1);
        break;
      }
    }
    contacts.unshift(contact);
    SetContactList([...contacts]);
  };
  useEffect(() => {
    FetchData();
  }, []);
  useEffect(() => {
    socket.on("message", function (message) {
      if (message.username == username) {
        FetchData();
        alert("You got new " + message.type + "!");
      }
    });
  }, [socket]);
  const FetchData = async () => {
    const res = await fetch("http://localhost:5000/api/Chats", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    if (res.status === 401) {
      alert("Error. please reconnect");
      return <Navigate replace to="/" />;
    } else if (res.status >= 500) {
      alert("Error. Please try again");
      return <Navigate replace to="/" />;
    } else if (res.status === 200) {
      let data = await res.json();
      SetContactList(data);
    }
  };
  const FindSelected = function () {
    for (let contact of contactList) {
      if (contact.id === selected) {
        return contact;
      }
    }
    return null;
  };
  if (token === null) {
    return <Navigate replace to="/" />;
  }
  return (
    <div id="chat-body">
      <div className="container cont w-100 m-0 p-0 mw-100">
        <div className="row cont w-100 m-0 p-0">
          {}
          <LeftSide
            contactList={contactList}
            selected={selected}
            SetSelected={SetSelected}
            token={token}
            username={username}
          />
          <RightSide
            selected={FindSelected()}
            token={token}
            UpdateContact={UpdateContact}
            socket={socket}
          />
        </div>
      </div>
      <LogOutModal />
      <AddContactModal
        token={token}
        contactList={contactList}
        SetContactList={SetContactList}
        socket={socket}
      />
    </div>
  );
}
export default Chat;
