import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import Addquestion from './Addquestion'
import Question from './Question'

const Home = (props) => {
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
    <>
      <Addquestion showAlert={props.showAlert} />
      <Question showAlert={props.showAlert} />
    </>
  )
}

export default Home
