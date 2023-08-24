import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"",password:""})
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory();

    const handleclick =async (e)=>{
        setIsLoading(true);
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_HOST_URI}/api/login`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const result =await response.json();
        setIsLoading(false);
        if(result.success)
        {
            localStorage.setItem('token',result.authToken)
            props.showAlert("Logged in successfully","success");
            history.push('/')
        }
        else
        {
            props.showAlert("Invalid Credendials","danger");
        }
    }
    const onchange = (a)=>{
        setcredentials({...credentials,[a.target.name]:a.target.value})
    }
    // console.log(process.env.REACT_APP_HOST_URL);
    return (
        <div className="mt-3">
        <div className='container my-4'>
        <h3 className='my-2'>Login to continue to Code Arena</h3>
            <form onSubmit={handleclick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' value={credentials.email} onChange={onchange} className="form-control" id="email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"  name='password' value={credentials.password} onChange={onchange} className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">
                {isLoading?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''}
                    Login
                </button>
            </form>
        </div>
        </div>
    )
}

export default Login
