import UserInfo from "../user-info/UserInfo";
import AddContactBtn from "../add-contact-btn/AddContactBtn";
import Contacts from "../contacts/Contacts";

function LeftSide({ contactList, selected, SetSelected, token, username }) {
  return (
    <div
      className="col col-4 d-block vh-100 start-0 cont m-0 p-0"
      id="chat-left-side"
    >
      <UserInfo token={token} username={username} />
      <span id="chat-contacts-box">
        <Contacts
          contacts={contactList}
          selected={selected}
          SetSelected={SetSelected}
        />
      </span>
      <AddContactBtn />
    </div>
  );
}
export default LeftSide;
