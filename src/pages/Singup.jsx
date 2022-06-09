import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';

function Singup() {
    const n = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const URL = process.env.REACT_APP_API;
    const register = (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            alert('Enter valid password');
            return;
        }
        console.log(email, password);
        axios.post(URL + '/users/register', { email, password }).then(response => {
            console.log(response.response);
            toast.success('User created successfully');
            n('/login');
        }).catch(err => {
            console.log('login errpor', err)
            toast.error(err?.response?.data?.message)
        })
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center my-5 py-5">
                    <div className="col-12 col-md-6 col-lg-5">
                        <div className="login-card">
                            <h4>
                                Register
                            </h4>
                            <center>
                                <form onSubmit={register}>
                                    <div>
                                        <input type="email" onInput={(e) => setemail(e.target.value)} />
                                    </div>

                                    <div>
                                        <input type="password" onInput={(e) => setpassword(e.target.value)} />
                                    </div>
                                    <div>
                                        <input type="password" onInput={(e) => setcpassword(e.target.value)} />
                                    </div>
                                    <input className='px-5' type="submit" value="Login" />
                                </form>
                                Already have account ? <NavLink to="/login" >Login</NavLink>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Singup