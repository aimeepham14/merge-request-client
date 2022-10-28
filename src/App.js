import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import EditProfile from './components/pages/EditProfile'
import Register from './components/pages/Register'
import Welcome from './components/pages/Welcome'
import Navbar from './components/Navbar'
import Swipe from './components/pages/Swipe'
import './App.css'
import jwt_decode from 'jwt-decode'
import Requests from './components/pages/Requests'

function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)

  // useEffect -- if the user navigates away form the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem('jwt')
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, []) // happen only once

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  return (
    <Router>
      <header>
        <Navbar 
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
      </header>

      <div className="App">
        <Routes>
          <Route 
            path="/"
            element={<Welcome />}
          />

          <Route 
            path="/register"
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path="/login"
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          {/* conditionally render auth locked routes */}
          <Route 
            path="/profile"
            element={currentUser ? <Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />}
          />
          <Route 
            path="/swipe/:userId"
            element={currentUser ? <Swipe currentUser={currentUser} setCurrentUser={setCurrentUser}/>  : <Navigate to="/login" />}
          />
          <Route 
            path="/requests"
            element={currentUser ? <Requests currentUser={currentUser} setCurrentUser={setCurrentUser}/>  : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:userId/edit"
            element={currentUser ? <EditProfile currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogout={handleLogout}/> : <Navigate to="/login" />}
          />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
