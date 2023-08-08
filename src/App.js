import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import ProblemState from './context/problem/problemState';

library.add(fas, faTwitter, faFontAwesome);

function App() {
  const [alert, setAlert] = useState(null);
  function showAlert(message, type){
      setAlert({
          msg: message,
          type: type
      })
      setTimeout(() => {
          setAlert(null)
      }, 1500);
  }

  return (
    <>
      <Router>
        
        <ProblemState>
          <Navbar />
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/'>
              <Home showAlert={showAlert}/>
            </Route>
            <Route exact path='/about'>
              <About showAlert={showAlert}/>
            </Route>
            <Route exact path='/login'>
              <Login showAlert={showAlert}/>
            </Route>
            <Route exact path='/signup'>
              <Signup showAlert={showAlert}/>
            </Route>
          </Switch>
          </ProblemState>
        </Router>
    </>
  );
}

export default App;
