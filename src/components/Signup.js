import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
  const [cred, setcred] = useState({ name: "", email: "", password: "", cpassword: "" })
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  const handleclick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(`${process.env.REACT_APP_HOST_URI}/api/createuser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password }),
    });
    const result = await response.json();
    setIsLoading(false);
    if (result.success) {
      localStorage.setItem('token', result.authToken)
      props.showAlert("Signed in successfully", "success");
      history.push('/')
    }
    else {
      props.showAlert("Invalid Credendials", "warning");
    }
  }
  const onchange = (a) => {
    setcred({ ...cred, [a.target.name]: a.target.value })
  }
  return (
    <div className="mt-3">
    <div className='container my-4'>
    <h3 className='my-2'>Singup to continue to Code Arena</h3>
      <form onSubmit={handleclick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">User Name</label>
          <input type="text" name='name' value={cred.name} onChange={onchange} className="form-control" id="email" aria-describedby="emailHelp" required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name='email' value={cred.email} onChange={onchange} className="form-control" id="email" aria-describedby="emailHelp" required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' value={cred.password} onChange={onchange} className="form-control" id="password" required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" name='cpassword' value={cred.cpassword} onChange={onchange} className="form-control" id="password" required minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">
        {isLoading?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''}
          SignUp
        </button>
      </form>
    </div>
    </div>
  )
}

export default Signup
