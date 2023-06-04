function Contact({ contact, selected, SetSelected }) {
  let isSelected = "",
    time;
  if (contact.id === selected) {
    isSelected = "chat-selected";
  }
  if (contact.lastMessage === null || contact.lastMessage === undefined) {
    return (
      <li
        className="list-group-item chat-contact"
        id={isSelected}
        onClick={() => SetSelected(contact.id)}
      >
        <img
          src={contact.user.profilePic}
          alt="my_image"
          className="rounded-circle chat-img"
        />
        <span className="chat-contact-name fw-bold">
          {" "}
          {contact.user.displayName}{" "}
        </span>
      </li>
    );
  }
  let today = new Date(),
    day = today.getDate(),
    month = today.getMonth() + 1;
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let currentDate = today.getFullYear() + "-" + month + "-" + day;
  if (contact.lastMessage.created.split("T")[0] === currentDate) {
    time =
      parseInt(contact.lastMessage.created.split("T")[1].split(":")[0]) + 3;
    if (time < 10) {
      time = "0" + time.toString();
    } else {
      time = time.toString();
    }
    time += ":";
    time += contact.lastMessage.created.split("T")[1].split(":")[1];
  } else {
    time = contact.lastMessage.created.split("T")[0];
  }
  return (
    <li
      className="list-group-item chat-contact"
      id={isSelected}
      onClick={() => SetSelected(contact.id)}
    >
      <img
        src={contact.user.profilePic}
        alt="my_image"
        className="rounded-circle chat-img"
      />
      <span className="chat-contact-name fw-bold">
        {" "}
        {contact.user.displayName}{" "}
      </span>
      <span className="chat-contact-lst">{contact.lastMessage.content}</span>
      <span className="chat-contact-date">{time}</span>
    </li>
  );
}
export default Contact;
