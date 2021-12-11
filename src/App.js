import './App.css';
import AppRouter from './components/AppRouter';
import Echo from 'laravel-echo';
import React, {useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from "./reducers/index";
import {initialState} from "./reducers/index";
import AppContext from "./Context";

window.Pusher = require('pusher-js'); 
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'fc054a204c0850b006aa',
  cluster: 'mt1',
  forceTLS: true
});


function App(){

    const [state, dispatch ] = React.useReducer(rootReducer, initialState);

    const providerState = {
        state,
        dispatch
    }

    useEffect(() => {
      window.Echo.channel('status-liked').listen('.status-liked', (data) =>{
        console.log(data);
             
      },1000)
    },[]);
/* **************************WEBSOCKET COLOR ******************************** */
useEffect(() => {
  console.log('toto')
    window.Echo.channel('color-used').listen('.color-used', (data) =>{
      console.log(data)
         data.color.map((color) => {
            dispatch({type:color.colorName.toUpperCase(), value:color.colorUsed}) 
        }); 
    },1000)
  },[]);

  /* **************************WEBSOCKET TEAM ******************************** */
  useEffect(() => {
    window.Echo.channel('team-event').listen('.team-event', (data) =>{
      console.log(data);
            dispatch({type:"TEAMS", teams:data.teams})
    },1000)
  },[]);

/* **************************WEBSOCKET RESULT ******************************** */
useEffect(() => {
    window.Echo.channel('result-event').listen('.result-event', (data) =>{
           dispatch({type:"RESULTS", results:data.team_answers})
           console.log(data.team_answers)
    },1000)
    },[]);

/* **************************WEBSOCKET CATEGORIES ******************************** */
useEffect(() => {
    window.Echo.channel('categorie-event').listen('.categorie-event', (data) =>{
        
             console.log({type:"CATEGORIES", categories:data.categorieShow})
            dispatch({type:"CATEGORIES", categories:data.categorieShow}) 
        
    },1000)
  },[]);

 /* **************************WEBSOCKET RANDOM ******************************** */
useEffect(() => {
    window.Echo.channel('random-event').listen('.random-event', (data) =>{
            
             console.log({type:"RANDOM", random:data.random})
            dispatch({type:"RANDOM", random:data.random}) 
        
    },1000)
  },[]);

/* **************************WEBSOCKET QUIZ ******************************** */
useEffect(() => {
  window.Echo.channel('quiz-event').listen('.quiz-event', (data) =>{
          
           console.log({type:"QUIZ", quizzes:data.data})
          dispatch({type:"QUIZ", quizzes:data.data}) 
      
  },1000)
},[]);

  return (
    <AppContext.Provider value={providerState} >
          <Router>
              <AppRouter/>
          </Router>
    </AppContext.Provider>
  )
}


export default App;