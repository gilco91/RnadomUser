import './App.css';
import { FilteringTable } from './components/FilteringTable';
import {BrowserRouter as Router,Routes,Route, Link} from 'react-router-dom'
import UserPage from './components/UserPage'
import axios from "axios";
import React ,{useState,useEffect} from "react";

function App() {

  const [users, setUsers] = useState([])

  useEffect(async ()=>{
    const localData = localStorage.getItem('users')
    if(localData) {
        const localUsers = JSON.parse(localData);//convert to js
        return setUsers(localUsers)
    }
      try {
        const result = await axios.get("https://randomuser.me/api/?results=60")
        const {results} = result.data
        localStorage.setItem('users', JSON.stringify(results))//convert from js object to json
        setUsers(results)

      } catch(error) {
        console.log(error)
      }
    
},[]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FilteringTable users={users}/>}/>
          <Route path="/user/:userId" element={<UserPage users={users}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
