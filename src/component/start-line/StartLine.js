import logo from "../logo.png";

function StartLine({ selected }) {
  if (selected === null) {
    return (
      <div id="chat-start">
        <img id="chat-logo" src={logo} alt="img" className="chat-img" />
      </div>
    );
  } else {
    return (
      <div id="chat-start">
        <img
          src={selected.profilePic}
          alt="my_image"
          className="rounded-circle"
          id="chat-img-big"
        />
        <span id="chat-start-name">{selected.user.displayName}</span>
        <img id="chat-logo" src={logo} alt="img" className="chat-img" />
      </div>
    );
  }
}
export default StartLine;
