import React, { useState, useEffect } from 'react'
import './App.css'
import moment from 'moment';


//The url for the Happy thought backend project
const thoughtsUrl = `https://happy-thought-api.herokuapp.com`


export const App = () => {

  const [message, setMessage] = useState(''); /** For the Form part**/
  const [thoughts, setThoughts] = useState([]);  /** For the handleSubmit .then **/
  const [happyText, setHappyText] = useState([]); /** list with happy thougts ***/
  const [likes, setLikes] = useState()


  useEffect(() => {
    fetch(thoughtsUrl)
      .then(res => res.json())
      .then(json => setHappyText(json));
  }, [message, happyText]); //dependencies for when the fecth should update

  // **** Submit and post a Happy thought ******
  const handleFormSubmit = (event) => {
    event.preventDefault()
    fetch(thoughtsUrl, {
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

  //  **** Heart button fetch *****
  const handleHeartSubmit = (id) => {
    fetch(`${thoughtsUrl}/${id}/like`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then(json => console.log(json))
      .then(setLikes(likes + 1))
      .catch(err => console.log('error', err))
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
              value={message}
              required>
            </textarea>
          </section>

          {/*** Form submit button ***/}
          <div>
            <button className="form-btn"
              onClick={handleFormSubmit}
              type="submit">
              <span role="img" aria-label="heart">❤️</span>
              Send Happy Thoughts
              <span role="img" aria-label="heart">❤️</span>
            </button >
          </div>

        </form>
      </div>


      {/****  List with meassages of Happy thoughts  *****/}
      <div>
        <ul>
          {happyText.map(text => (
            <li key={text._id} className="message-list">
              <div className="message"> {text.message} </div>
              <section className="bottom-line">
                <div className="heart-div">
                  {/***  Heart/like button ***/}
                  <button className="heart-btn"
                    onClick={() => handleHeartSubmit(text._id)}>
                    <span role="img" aria-label="heart">❤️</span>
                  </button>
                  <span className="hearts-clicked"> x {text.heart}</span>
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
  )
}

