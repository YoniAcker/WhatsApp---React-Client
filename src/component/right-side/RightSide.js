import StartLine from "../start-line/StartLine";
import ChatBox from "../chat-box/ChatBox";
import NewTextLine from "../new-text-line/NewTextLine";
import { useState, useEffect } from "react";

function RightSide({ selected, token, Update }) {
  const [messageList, SetMessageList] = useState([]);
  const FetchData = async function () {
    if (selected === null) {
      return;
    } else {
      await fetch(
        "http://localhost:5000/api/Chats/" + selected.id + "/Messages",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
        }
      )
        .then((res) => {
          if (res.status === 401) {
            alert("Error. please reconnect");
            return null;
          } else if (res.status >= 400) {
            alert("Error. Please try again");
            return null;
          } else if (res.status === 200) {
            return res.json();
          }
        })
        .then((messages) => {
          SetMessageList(messages);
        });
    }
  };
  useEffect(() => {
    SetMessageList([]);
    FetchData();
  }, [selected]);
  if (selected === null) {
    return (
      <div className="col col-8 cont m-0 p-0">
        <StartLine selected={selected} />
        <div id="chat-chat">
          <ChatBox messageList={messageList} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="col col-8 cont m-0 p-0">
        <StartLine selected={selected} />
        <div id="chat-chat">
          <ChatBox
            messageList={messageList}
            username={selected.user.username}
          />
          <NewTextLine id={selected.id} token={token} Update={Update} />
        </div>
      </div>
    );
  }
}
export default RightSide;
