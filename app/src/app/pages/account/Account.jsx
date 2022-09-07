import { requirePropFactory } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getUserInfos } from '../../../core/services/user/user.service';
import { FormAccount } from '../../layout/forms/Forms'

const Account = (isAuthenticated) => {

    const [credentials, setCredentials] = useState({});
    const [image, setImage] = useState();

    const fetchUserInformations = async () => {
        if (isAuthenticated) {
            try {
                const data = await getUserInfos();
                setCredentials(data);
                console.log(data);
                setImage(data.profilImg.split('app')[1])

            } catch (error) {
                console.log(error);
            }
        } else {
            return;
        }
    }
    useEffect(() => {
        fetchUserInformations();
    }, [])
    return (
        <div className="account">
            <h1>{credentials && credentials.pseudo}</h1>
            <FormAccount fetchUserInformations={fetchUserInformations} setCredentials={setCredentials} credentials={credentials} isAuthenticated={isAuthenticated} />
        </div>
    )
}

export default Account