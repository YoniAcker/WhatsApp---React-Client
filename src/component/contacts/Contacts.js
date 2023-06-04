import Contact from "../contact/Contact";

function Contacts({ contacts, selected, SetSelected }) {
  const contactList = [];
  let key = 0;
  for (let contact of contacts) {
    contactList.push(
      <Contact
        key={key++}
        contact={contact}
        selected={selected}
        SetSelected={SetSelected}
      />
    );
  }
  return (
    <ul id="chat-contacts" className="list-group list-group-flush">
      {contactList}
    </ul>
  );
}
export default Contacts;
