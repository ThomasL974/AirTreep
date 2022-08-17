import React, { useEffect, useState } from 'react'
import FormSignin from './FormSignin'
import FormSignup from './FormSignup'
import { revealFormOpacity } from './animation';

function Forms({ userInfos, setUserInfos }) {

    const [credentials, setCredentials] = useState({});
    const [toast, setToast] = useState({});
    const [register, setRegister] = useState(true);


    useEffect(() => {
        revealFormOpacity();
    },[register]);

    return (
        <div className="forms register login">
            {!register ?
                <FormSignup
                    credentials={credentials}
                    setCredentials={setCredentials}
                    toast={toast}
                    setToast={setToast}
                    setRegister={setRegister}
                    register={register}
                    >
                </FormSignup>
            :
                <FormSignin
                    credentials={credentials}
                    setCredentials={setCredentials}
                    toast={toast}
                    setToast={setToast}
                    userInfos={userInfos}
                    setUserInfos={setUserInfos}
                    setRegister={setRegister}
                    className="forms__login">
                </FormSignin>
            }
        </div>
    )
}

export default Forms