import React, { useState, useEffect } from 'react'
// import { Messages } from './Happy-Messages/Messages'
// import { Form } from './Happy-Form/Form'
import './App.css'
import moment from 'moment';


export const App = () => {
  const [message, setMessage] = useState(''); /** For the Form part**/
  const [text, setText] = useState('');/**  ev plocka bort **/
  const [thoughts, setThoughts] = useState([]);  /** For the handleSubmit .then **/
  const [happyText, setHappyText] = useState([]); /** list with happy thougts ***/
  const [heartValue, setHeartValue] = useState([]);



  useEffect(() => {

    fetch(`https://technigo-thoughts.herokuapp.com`)
      .then(res => res.json())
      /*.then(json => console.log(json))*/
      .then(json => setHappyText(json));
  }, [message, happyText]); // the array gives it a 2nd argument to prevent the fetch to happen everytime the state changes


  const handleFormSubmit = (event) => {
    event.preventDefault()

    fetch(`https://technigo-thoughts.herokuapp.com/`, {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' }
    })

      .then((res) => res.json())
      .then((newThought) => {
        setThoughts((previousThoughts) => [newThought, ...previousThoughts])
      })
      .then(() => setMessage(""))
  }


  const handleHeartSubmit = (id) => {

    fetch(`https://technigo-thoughts.herokuapp.com/${id}/like`, {
      method: 'POST',
      body: "",
      headers: { 'Content-Type': 'application/json' }
    })

      .then((res) => res.json())
      .then(json => console.log(json))
    // .then((prevState) => {
    //   setHeartValue((updatedValues) => [prevState, ...updatedValues])
    //})
  }



  return (
    <div>

      {/**** Form for sending Happy thoughts  *****/}
      <div className="form-box">
        <form onSubmit={(event) => event.preventDefault()}>

          <section>
            <p>What's making you happy right now?:</p>
            <textarea
              rows="3"
              minLength="5"
              maxLength="150"
              onChange={(event) => setMessage(event.target.value)}
              value={message} //tror jag kan plocks bort den
              required>
            </textarea>

          </section>

          <div>
            <button className="form-btn"
              onClick={handleFormSubmit}
              type="submit" >
              <span role="img" aria-label="heart">❤️</span>
              Send Happy Thoughts
              <span role="img" aria-label="heart">❤️</span>
            </button >
          </div>

        </form>
      </div>

      {/****  List with Happy thoughts meassages *****/}
      <div>
        <ul>
          {happyText.map(text => (
            <li key={text._id} className="message-list">

              <div className="message"> {text.message} </div>
              <section className="bottom-line">
                <div className="heart-div">
                  <button className="heart-btn"
                    onClick={() => handleHeartSubmit(text._id)}>
                    <span role="img" aria-label="heart">❤️</span>
                  </button>
                  <span className="hearts-clicked"> x {text.hearts}</span>
                </div>
                <div className="time">
                  {moment(text.createdAt).fromNow()}
                </div>
              </section>
            </li >
          ))}
        </ul>
      </div >

    </div >

  );
};

