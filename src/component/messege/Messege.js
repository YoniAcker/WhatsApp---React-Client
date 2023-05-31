function Messege({ message, username }) {
  let msg, tri;
  if (message.sender.username === username) {
    msg = "chat-right-msg";
    tri = "chat-triangle-right";
  } else {
    msg = "chat-left-msg";
    tri = "chat-triangle-left";
  }
  return (
    <span className={msg}>
      {message.content}
      <div className={tri}></div>
      <span className="badge rounded-pill text-bg-secondary time-pill">
        {message.created.split("T")[1].split(":")[0] +
          ":" +
          message.created.split("T")[1].split(":")[1]}
      </span>
    </span>
  );
}
export default Messege;
