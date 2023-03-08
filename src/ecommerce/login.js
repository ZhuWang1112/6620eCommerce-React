import axios from 'axios';
import {useState} from "react";
import {Navigate} from "react-router";
import {Link} from "react-router-dom";

axios.defaults.withCredentials = true

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false); // 初始化为false

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', {username, password});
            console.log(response.data);
            setShouldRedirect(true); // 设置为true
            localStorage.setItem('username', username);
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response.data.error);
        }
    };

    if (shouldRedirect) {
        return <Navigate to='/store/home'/>;
    }

    return (
        <div className={"row"}>
            <div className="col-4"></div>
            <div className="col-3">
                <form className={"mt-5"} onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                        <input type="text" id="username" className="form-control" name="username" value={username}
                               onChange={(event) => setUsername(event.target.value)}/>
                        <label className="form-label" htmlFor="username">Username</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="password" className="form-control" name="password" value={password}
                               onChange={(event) => setPassword(event.target.value)}/>
                        <label className="form-label" htmlFor="password">Password</label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                    {errorMessage && <p>{errorMessage}</p>}

                    <div className="text-center">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <p>Not a member? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
            <div className="col-4"></div>
        </div>
    );
};
export default Login;