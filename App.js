import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Poll from 'react-polls';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { RoutedTabs, NavTab } from 'react-router-tabs'

const pollQuestion = 'Is react-polls useful?'
const pollAnswers = [
  { option: 'Yes', votes: 2 },
  { option: 'No', votes: 8 }
]

class App extends Component {
  /*state = {
     pollAnswers: [...pollAnswers]
   }*/
  handleVote = () => {
    console.log('here')
  }

  render () {
    //const { pollAnswers } = this.state
    return (
      <Router>
      <div className="App">
        <Poll question={pollQuestion} answers={pollAnswers} />
      </div>

        {/*
        <ul className="tab-bar">
          <li className="tab wave dark"><Link to="/" >Primero</Link></li>
          <li className="tab wave dark"><Link to="/" >Seogo</Link></li>
          <li className="tab wave dark">Tercero</li>
          <li className="tab wave dark">Cuarto</li>
          <li className="tab wave dark">Quinto</li>
        <div class="indicator"></div>

       </ul>
       */}
       <div>
         <NavTab to="/admins">Admins</NavTab>
         <NavTab to="/moderators">Moderators</NavTab>
         <NavTab to="/users" >Users</NavTab>
         <span></span>
          <NavTab disabled='true' to='' >Welcome</NavTab>
         <button>Logout</button>
      </div>
      </Router>
    );
  }
}

export default App;
