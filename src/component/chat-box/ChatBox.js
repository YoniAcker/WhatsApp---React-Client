import Messege from "../messege/Messege";

function ChatBox({ messageList, username }) {
  let key = 0,
    messages = [];
  for (let message of messageList) {
    messages.push([
      <Messege key={key++} message={message} username={username} />,
    ]);
  }
  return <div id="chat-chat-box">{messages}</div>;
}
export default ChatBox;
