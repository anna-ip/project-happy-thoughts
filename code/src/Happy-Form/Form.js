import React, { useState, useEffect } from 'react'
import 'Happy-Form/Form.css'

export const Form = () => {
    const [submitted, setSubmitted] = useState(false) /*submit form*/
    const [text, setText] = useState([]);
    const [message, setMessage] = useState([])

    const handleFormSubmit = (event) => {
        event.preventDefault()


        useEffect(() => {
            console.log('Mounted')


        })
    }

    return (
        <div className="form-box">
            <form onSubmit={event => event.preventDefault()}>

                <section>
                    <p>What's making you happy right now?:</p>
                    <textarea
                        minLength="5"
                        maxLength="150"
                        onChange={event => setText(event.target.value)}
                        value={text}
                        required>
                    </textarea>
                    {/* I had a input like last weeks form but changed it to textarea */}
                </section>
                <div >
                    < button onClick={() => setSubmitted(true)} type="submit" >❤️ Send Happy Thoughts ❤️</button >

                </div>

            </form>
        </div>
    )
}