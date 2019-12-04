import React, { useState, useEffect } from 'react'

export const Messages = props => {
    const [message, setMessage] = useState();

    useEffect(() => {
        fetch(props.message)
            .then(res => res.json())
            .then(json => {
                /*console.log(json);*/
                setMessage(json);
            });
    }, [props]);

    return (
        <div>
            <h1>{props.message}</h1>
            {/* {messages && <img src={details.sprites.front_default} alt="Pokemon" />} */}
        </div>
    );
};