function Messege({ message, username }) {
  let msg, tri;
  if (message.sender.username === username) {
    msg = "chat-right-msg";
    tri = "chat-triangle-right";
  } else {
    msg = "chat-left-msg";
    tri = "chat-triangle-left";
  }
  let time = parseInt(message.created.split("T")[1].split(":")[0]) + 3;
  if (time < 10) {
    time = "0" + time.toString();
  } else {
    time = time.toString();
  }
  time += ":";
  time += message.created.split("T")[1].split(":")[1];
  return (
    <span className={msg}>
      {message.content}
      <div className={tri}></div>
      <span className="badge rounded-pill text-bg-secondary time-pill">
        {time}
      </span>
    </span>
  );
}
export default Messege;
