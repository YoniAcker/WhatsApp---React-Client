import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login-Register.css";

function Register_form() {
  let navigate = useNavigate();
  const [correct_userName, set_correct_name] = useState(0);
  const [correct_password, set_correct_password] = useState(0);
  const [correct_ver, set_correct_ver] = useState(0);
  const [correct_displayName, set_correct_displayName] = useState(0);
  const [correct_img, set_correct_img] = useState(0);

  const [correct_register, set_correct_register] = useState(0);

  const [input, setInput] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    user_display_name: "",
    user_image: "",
  });

  const [error, setError] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    user_display_name: "",
    user_image: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const RegisterFunc = async function () {
    if (correct_register === 0) {
      alert("At least one of the fields was not entered correctly");
    } else {
      let image = document.getElementById("image").files[0];
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          SendToServer(reader.result);
        };
        reader.readAsDataURL(image);
      } catch (error) {
        alert("Error converting image to base64.");
      }
    }
  };

  const SendToServer = async function (image) {
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    let displayName = document.getElementById("displayName").value;
    const res = await fetch("http://localhost:5000/api/Users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: password,
        displayName: displayName,
        profilePic: image,
      }),
    });
    if (res.status === 409) {
      alert("This user-name already exist in the system.");
      return;
    }
    if (res.status === 400 || res.status === 500) {
      alert("Error. Please try again");
      return;
    }
    navigate("/");
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      if (
        correct_displayName *
          correct_password *
          correct_img *
          correct_userName *
          correct_ver !==
        0
      ) {
        set_correct_register(1);
      } else {
        set_correct_register(0);
      }
      switch (name) {
        case "userName":
          if (!value) {
            stateObj[name] = "Please enter user-name.";
            set_correct_name(0);
          } else {
            set_correct_name(1);
          }
          break;
        case "user_image":
          if (!value) {
            stateObj[name] = "Please enter image.";
            set_correct_img(0);
          } else {
            set_correct_img(1);
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password. ";
            set_correct_password(0);
          } else if (value.length < 8) {
            stateObj[name] = "The password must have at least 8 characters. ";
            set_correct_password(0);
          } else if (!(/\d/.test(value) && /[a-zA-Z]/.test(value))) {
            stateObj[name] = "The password must include letters and numbers. ";
            set_correct_password(0);
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match. ";
            set_correct_password(0);
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
            set_correct_password(1);
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password. ";
            set_correct_ver(0);
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match. ";
            set_correct_ver(0);
          } else {
            set_correct_ver(1);
          }
          break;

        case "user_display_name":
          if (!value) {
            stateObj[name] = "Please enter display name. ";
            set_correct_displayName(0);
          } else {
            set_correct_displayName(1);
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  return (
    <>
      <div className="login_register_body">
        <br></br>

        <form method="post">
          <div className="login_cont">
            <div className="login_main">
              <div className="errors">
                <h5>
                  * The password must have at least 8 characters.<br></br>* The
                  password must include letters and numbers.
                </h5>
              </div>

              <div className="flex-container">
                <div className="flex-item4">userName</div>
                <div className="flex-item8">
                  <input
                    className="my_input"
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="Enter userName"
                    value={input.userName}
                    onChange={onInputChange}
                    onBlur={validateInput}
                  ></input>
                </div>
              </div>
              <div className="errors">
                {error.userName && (
                  <span className="err">{error.userName}</span>
                )}
              </div>

              <div className="flex-container">
                <div className="flex-item4">Password</div>
                <div className="flex-item8">
                  <input
                    className="my_input"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    value={input.password}
                    onChange={onInputChange}
                    onBlur={validateInput}
                  ></input>
                </div>
              </div>
              <div className="errors">
                {error.password && (
                  <span className="err">{error.password}</span>
                )}
              </div>

              <div className="flex-container">
                <div className="flex-item4">Password verification</div>
                <div className="flex-item8">
                  <input
                    className="my_input"
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter Confirm Password"
                    value={input.confirmPassword}
                    onChange={onInputChange}
                    onBlur={validateInput}
                  ></input>
                </div>
              </div>
              <div className="errors">
                {error.confirmPassword && (
                  <span className="err">{error.confirmPassword}</span>
                )}
              </div>

              <div className="flex-container">
                <div className="flex-item4">Display name</div>
                <div className="flex-item8">
                  <input
                    className="my_input"
                    type="text"
                    name="user_display_name"
                    id="displayName"
                    placeholder="Enter user display name"
                    value={input.user_display_name}
                    onChange={onInputChange}
                    onBlur={validateInput}
                  ></input>
                </div>
              </div>
              <div className="errors">
                {error.user_display_name && (
                  <span className="err">{error.user_display_name}</span>
                )}
              </div>

              <div className="flex-container">
                <div className="flex-item4">image</div>
                <div className="flex-item8">
                  <input
                    className="my_input"
                    type="file"
                    name="user_image"
                    id="image"
                    placeholder="Upload a image"
                    value={input.user_image}
                    onChange={onInputChange}
                    onBlur={validateInput}
                  ></input>
                </div>
              </div>
              <div className="errors">
                {error.user_image && (
                  <span className="err">{error.user_image}</span>
                )}
              </div>

              <div className="flex-container">
                <div className="flex-item4">
                  <button
                    type="button"
                    className="btn btn-primary login-btn"
                    id="register_btn"
                    onClick={RegisterFunc}
                  >
                    Register
                  </button>
                </div>
                <div className="flex-item8">
                  Alreasdy registered?&nbsp; <Link to="/"> Click here </Link>{" "}
                  &nbsp;to login.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register_form;
