import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./App";

function LoginForm(e) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/api/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        let token = res.data.token;
        let username = res.data.username;
        let pk = res.data.pk;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("pk", pk);
        window.location.pathname = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.pathname = "/";
    }
  }, []);

  return (
    <div className="w-75 d-flex justify-content-center align-items-center">
      <form onSubmit={(e) => login(e)}>
        <div className="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Nhập username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
          />
          {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your details with anyone else.
          </small> */}
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Đăng nhập
        </button>
        <div className="form-group">
          <small
            id="emailHelp"
            className="form-text text-muted text-center mt-4"
          >
            Bạn chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
          </small>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
