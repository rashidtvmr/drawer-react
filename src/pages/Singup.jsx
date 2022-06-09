import axios from 'axios';
import React, { useState } from 'react'
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
        }).catch(err => {
            console.log('login errpor', err)
        })
    }

    return (
        <div>Register


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
                    <input type="submit" value="Login" />
                </form>
                Already have account ? <NavLink to="/login" >Login</NavLink>
            </center>
        </div>
    )
}

export default Singup