import React, { useState, useEffect } from 'react'
// import { Messages } from './Happy-Messages/Messages'
// import { Form } from './Happy-Form/Form'
import './App.css'
import moment from 'moment';


export const App = () => {
  const [message, setMessage] = useState(''); /** For the Form part**/
  const [selectedThought, setSelectedThought] = useState();
  const [submitted, setSubmitted] = useState(false) /*submit form*/
  const [text, setText] = useState('');
  const [thoughts, setThoughts] = useState([]);  /** For the handleSubmit .then **/
  const [happyText, setHappyText] = useState([]); /** list with happy thougts ***/

  useEffect(() => {
    fetch("https://technigo-thoughts.herokuapp.com")
      .then(res => res.json())
      /*.then(json => console.log(json))*/
      .then(json => setHappyText(json));
  }, []); // the array gives it a 2nd argument to prevent the fetch to happen everytime the state changes



  const handleFormSubmit = (event) => {
    event.preventDefault()

    fetch('https://technigo-thoughts.herokuapp.com/', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' }
    })

      .then((res) => res.json())
      .then((newThought) => {
        setThoughts((previousThoughts) => [newThought, ...previousThoughts])
      })
  }

  const handleHeartSubmit = (event) => {
    //   event.preventDefault()

    //   fetch('https://tdechnigo-thoughts.herokuapp.com/THOUGHT_ID/like', {
    //     method: 'POST'
    //   })

    //   .then((res) => res.json())
    //   .then(json => )
  }




  return (
    <div>
      <div className="form-box">
        <form onSubmit={(event) => event.preventDefault()}>

          <section>
            <p>What's making you happy right now?:</p>
            <textarea
              minLength="5"
              maxLength="150"
              onChange={(event) => setMessage(event.target.value)}
              value={message}
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

      <div>
        <ul>
          {happyText.map(text => (
            <li key={text._id} className="message-list">

              <div className="message"> {text.message} </div>
              <section className="bottom-line">
                <div className="heart-div">
                  <button className="heart-btn"
                    onClick={handleHeartSubmit}><span role="img" aria-label="heart">❤️</span></button> <span> x {text.hearts}</span>
                </div>
                <div className="time">
                  {moment(text.createdAt).fromNow()}
                </div>
              </section>
            </li >
          ))}
        </ul>
      </div>


      {/* {selectedThought && (
        // <Messages message={selectedThought.message} hearts={selectedThought.hearts} />
      )} */}

    </div>

  );
};
