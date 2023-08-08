import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
const About = (props) => {
 
  let history = useHistory();
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      props.showAlert("Please login first","danger");
      history.push('/login')
    }
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>
      tis is about
    </div>
  )
}

export default About
