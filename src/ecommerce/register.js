import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router";
import {API_BASE_URL} from "../config";


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) { // 如果密码不匹配，提示错误并返回
      setErrorMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { username, password });
      if (response.data.success) {
        setShouldRedirect(true);
      } else {
        // 处理其他错误
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.error);
    }
  };

  if (shouldRedirect) {
    return <Navigate to='/' />;
  }

  return (
    <div className={"row"}>
      <div className="col-4"></div>
      <div className="col-3">
        <form className={"mt-5"} onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <input type="text" id="username" className="form-control" name="username" value={username}
              onChange={(event) => setUsername(event.target.value)} />
            <label className="form-label" htmlFor="username">Username</label>
          </div>

          <div className="form-outline mb-4">
            <input type="password" id="password" className="form-control" name="password" value={password}
              onChange={(event) => setPassword(event.target.value)} />
            <label className="form-label" htmlFor="password">Password</label>
          </div>

          <div className="form-outline mb-4">
            <input type="password" id="confirm-password" className="form-control" name="confirmPassword" value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)} />
            <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>
          {errorMessage && <p className={"text-warning"}>{errorMessage}</p>}
        </form>
      </div>
      <div className="col-4"></div>
    </div>
  );
}

export default Register;
