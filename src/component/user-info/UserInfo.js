import { useState, useEffect } from "react";

function UserInfo({ token, username }) {
  const [userInfo, SetUserInfo] = useState({});
  const FetchData = async function () {
    const res = await fetch("http://localhost:5000/api/Users/" + username, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((info) => {
        SetUserInfo(info);
      });
  };
  useEffect(() => {
    FetchData();
  }, [username]);
  return (
    <div id="chat-user-info" className="list-group-item">
      <img
        src={userInfo.profilePic}
        alt="my_image"
        className="rounded-circle"
        id="chat-user-img"
      />
      <span className="fw-bold" id="chat-user-name">
        {userInfo.displayName}
      </span>
      <button
        id="chat-logout-btn"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#logoutModal"
      >
        log-out
      </button>
    </div>
  );
}
export default UserInfo;
