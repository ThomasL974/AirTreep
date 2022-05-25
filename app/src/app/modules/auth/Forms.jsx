import React, { useState } from 'react'
import FormSignin from './FormSignin'
import FormSignup from './FormSignup'

function Forms() {

    const [credentials, setCredentials] = useState({})
    const [message, setMessage] = useState('')
    
    return (
        <div className="forms register login">
            <FormSignup
                credentials={credentials}
                setCredentials={setCredentials}
                message={message}
                setMessage={setMessage}>
            </FormSignup>
            <FormSignin
                credentials={credentials}
                setCredentials={setCredentials}
                message={message}
                setMessage={setMessage}>
            </FormSignin>
        </div>
    )
}

export default Forms