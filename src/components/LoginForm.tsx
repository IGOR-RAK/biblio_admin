import React, {useState, useContext} from 'react'
import {Context} from "../index";

function LoginForm() {
    const {store} = useContext(Context);
    const [user, setUser] = useState({
        email:'', password: ''
    })

    const onChangeInput= (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async (e: React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault()
        store.login(user)      
    }

    return (
        <div className='login-form'> 
            <div className="center">         
                <form onSubmit={loginSubmit}>
                    <h1>Login</h1>
                    <div className='txt_field'>
                        <input 
                        type="email" 
                        name="email" 
                        required value={user.email} 
                        onChange={onChangeInput} 
                        />
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div className='txt_field'>
                        <input type="password" name="password" required autoComplete="on"
                         value={user.password} onChange={onChangeInput} />
                        <span></span>
                        <label>Password</label>
                    </div>

                    <div className="row">
                        <button type="submit">Login</button>                   
                    </div>
                </form>
            </div> 
        </div>
    )
}

export default LoginForm
