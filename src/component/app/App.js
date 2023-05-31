import Chat from "../chat/Chat";
import Login from "../login/Login";
import Register from "../register/Register";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [token, SetToken] = useState(null);
  const [username, SetUsername] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login SetToken={SetToken} SetUsername={SetUsername} />}
        ></Route>
        <Route
          path="/chat"
          element={<Chat token={token} username={username} />}
        ></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
