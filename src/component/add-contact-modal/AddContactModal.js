import { useRef } from "react";

function AddContactModal({ token, contactList, SetContactList, socket }) {
  const contactName = useRef(null);
  const Add = async function () {
    if (contactName.current.value !== "") {
      const res = await fetch("http://localhost:5000/api/Chats", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          username: contactName.current.value,
        }),
      });
      if (res.status === 404) {
        alert("There is no user with this name in the system!");
      } else if (res.status === 409) {
        alert("You already have chat with this user");
      } else if (res.status === 401) {
        alert("Error. please reconnect");
      } else if (res.status === 500) {
        alert("Error. Please try again");
      } else {
        let newUser = await res.json();
        SetContactList([...contactList, newUser]);
        socket.emit("message", {
          username: newUser.user.username,
          type: "contact",
        });
      }
      contactName.current.value = "";
    }
  };
  return (
    <div
      className="modal fade"
      id="addContactModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Add new contact
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              ref={contactName}
              type="text"
              className="form-control"
              placeholder="Contact's name"
            />
          </div>
          <div className="modal-footer">
            <button
              onClick={Add}
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddContactModal;
