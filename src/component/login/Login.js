import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import "../Login-Register.css";

function Login({ SetToken, SetUsername }) {
  let navigate = useNavigate();
  const [error, SetError] = useState("");

  async function Confirm() {
    let userName = document.getElementById("username_input").value;
    let password = document.getElementById("password_input").value;
    if (userName === "") {
      SetError("Please enter user-name");
    } else if (password === "") {
      SetError("Please enter password");
    } else {
      const res = await fetch("http://localhost:5000/api/Tokens", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, password: password }),
      });
      const text = await res.text();
      if (res.status >= 400) {
        SetError(text);
        return;
      }
      SetToken(text);
      SetUsername(userName);
      navigate("/chat");
    }
  }

  return (
    <div className="bg_def">
      <div className="logo_class">
        <img src={logo} alt="logo" className="img_logo_login"></img>
      </div>
      <div className="login_register_body">
        <br></br>

        <form method="post">
          <div className="login_cont">
            <div className="login_main">
              <div className="flex-container">
                <div className="flex-item4">Username</div>
                <div className="flex-item8">
                  <input
                    className="my_input"
                    type="text"
                    name="username"
                    id="username_input"
                    placeholder="Enter Username"
                  ></input>
                </div>
              </div>

              <div className="flex-container">
                <div className="flex-item4">Password</div>
                <div className="flex-item8">
                  <input
                    className="my_input"
                    type="password"
                    name="password"
                    id="password_input"
                    placeholder="Enter Password"
                  ></input>
                </div>
              </div>

              <div id="errors" className="errors">
                {error}
              </div>
              <div className="flex-container">
                <div className="flex-item4">
                  <button
                    type="button"
                    className="btn btn-primary login-btn"
                    id="register_btn"
                    onClick={Confirm}
                  >
                    Login
                  </button>
                </div>

                <br></br>
                <div className="flex-item8">
                  Not registered?&nbsp; <Link to="/Register"> Click here</Link>{" "}
                  &nbsp;to register.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
