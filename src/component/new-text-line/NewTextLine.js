import { useRef } from "react";

function NewTextLine({
  token,
  messageList,
  SetMessageList,
  id,
  contactList,
  SetContactList,
}) {
  const messegeText = useRef(null);
  const Add = async function () {
    if (messegeText.current.value !== "") {
      const res = await fetch(
        "http://localhost:5000/api/Chats/" + id + "/Messages",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            msg: messegeText.current.value,
          }),
        }
      );
      if (res.status === 401) {
        alert("Error. please reconnect");
      } else if (res.status >= 400) {
        alert("Error. Please try again");
      } else if (res.status === 200) {
        let newMessage = await res.json();
        SetMessageList([newMessage, ...messageList]);
        for (let contact of contactList) {
          if (contact.id === id) {
            contact.lastMessage = newMessage;
          }
        }
        SetContactList(contactList);
      }
      messegeText.current.value = "";
    }
  };
  return (
    <div id="chat-new-text" className="container cont chat-cont m-0 p-0">
      <div className="row">
        <div className="col col-1"></div>
        <div className="col col-6">
          <input
            ref={messegeText}
            type="text"
            className="form-control"
            placeholder="New massage here..."
          />
        </div>
        <div className="col col-2">
          <button
            onClick={Add}
            id="chat-sendbtn"
            type="button"
            className="btn btn-primary"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
export default NewTextLine;
