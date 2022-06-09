import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom'
const Login = ({ history }) => {
    const n = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const URL = process.env.REACT_APP_API;
    const login = (e) => {
        e.preventDefault();
        console.log(email, password);
        axios.post(URL + '/users/login', { email, password }).then(response => {
            console.log(response);
            localStorage.setItem('token', response.data.token);
            toast.success('Logged in successfulyy');
            n('/dashboard');
        }).catch(err => {
            console.log('login errpor', err)
        })
    }

    return (
        <div>
            <div className="container py-5 my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-5">
                        <div className="login-card">
                            <h4>Login</h4>
                            <center>
                                <form onSubmit={login}>
                                    <div>
                                        <input type="email" onInput={(e) => setemail(e.target.value)} />
                                    </div>

                                    <div>
                                        <input type="password" onInput={(e) => setpassword(e.target.value)} />
                                    </div>
                                    <input  className='px-5' type="submit" value="Login" />
                                </form>
                                New User ? <NavLink to="/signup" >Register</NavLink>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login