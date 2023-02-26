import React, { useCallback, useEffect, useState } from 'react'
import { singin } from '../../../core/services/auth/auth.service';
import { ToastMessage } from '../../layout/shared/toast/Toast';
import { useNavigate, useParams } from 'react-router';
import { signup } from '../../../core/services/auth/auth.service'
import { ImArrowLeft2 } from "react-icons/im";
import { Button } from '@mui/material'
import { createTravel, getTravel, updateTravel } from '../../../core/services/travels/travel.service'
import { difficulties } from '../../../assets/data/data';
import { errorSinginForm, errorTravelForm } from '../../../assets/data/errorsData';
import { AddressAutofill } from '@mapbox/search-js-react';
import { Field, FormikProvider, useFormik } from 'formik';
import _ from 'lodash';
import { handleClick, handleClose } from '../shared/toast/toastLogique';
import { getUserInfos, updateUser, uploadProfileImg } from '../../../core/services/user/user.service';
import { FaAddressCard } from "react-icons/fa";



export const FormSignin = ({ credentials, setCredentials, toast, setToast, setRegister }) => {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    /**
     * This function is used to validate the form
     * @param {*} values represents the fields of the form
     * @returns errors
     */
    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = errorSinginForm.email.required;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = errorSinginForm.email.character;
        }

        if (!values.password) {
            errors.password = errorSinginForm.password.required;
        }

        return errors;
    };

    /**
     * Retrieves the different functions of formik and initializes the form fields
     */
    const formikbag = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        enableReinitialize: true,
        onSubmit: values => {
            _submit(values);
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formikbag;

    const displayRegister = () => {
        setRegister(false);
    }

    const _submit = async (values) => {
        try {

            await singin(values)

            setToast({
                message: 'Vous êtes connecté',
                severity: 'success'
            })

            handleClick(setOpen);

            setTimeout(() => {
                navigate('/travels')
            }, 1000)
        } catch (error) {
            setToast({
                message: 'Email ou mot de passe incorrect',
                severity: 'error'
            })
            handleClick(setOpen);
        }
    }

    return (
        <div className="signin">
            <h1>Se connecter</h1>
            <form className="signin__form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    className="input-form"
                    placeholder="E-mail"
                    onChange={handleChange}
                    autoComplete="off"
                    onBlur={handleBlur} />
                {errors.email && touched.email ? <div className='error-form'>{errors.email}</div> : null}

                <input
                    type="password"
                    name="password"
                    className="input-form"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                    autoComplete="off"
                    onBlur={handleBlur} />
                {errors.password && touched.password ? <div className='error-form'>{errors.password}</div> : null}

                <input type="submit" value="Se connecter" className="signin__form-send btn btn-send" />
            </form>
            <div className="forgot">
                <a href="/#">Mot de passe oublié ?</a>
            </div>
            <div className="signin__register">
                <p>Pas de compte ?</p>
                <button onClick={displayRegister}>Créer un compte</button>
            </div>
            <ToastMessage open={open} handleClose={(e, reason, setOpen) => handleClose(e, reason, setOpen)} toast={toast}></ToastMessage>
        </div>
    )
}

export const FormSignup = ({ credentials, setCredentials, toast, setToast, setRegister }) => {

    const [open, setOpen] = useState(false);

    const handleDisplayRegisterForm = () => {
        setRegister(true);
    }

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signup(credentials)

            setToast({
                message: 'Vous êtes maintenant inscrit',
                severity: 'success'
            })
            handleClick(setOpen)

            setTimeout(() => {
                handleDisplayRegisterForm()
            }, 2000)
        } catch (error) {
            setToast({
                message: 'Des informations sont incorrect',
                severity: 'error'
            })
            handleClick(setOpen)
        }
    }

    return (
        <div className="signup">
            <div className="signup__backIcon" onClick={handleDisplayRegisterForm}>
                <ImArrowLeft2 />
            </div>
            <h1>S'inscrire</h1>
            <form className="signup__form" onSubmit={handleSubmit}>
                <div className="signup__first-last">
                    <input type="text" name="firstName" className="input-form" placeholder="Prénom" onChange={handleChange} autoComplete="off" />
                    <input type="text" name="lastName" className="input-form" placeholder="Nom" onChange={handleChange} autoComplete="off" />
                </div>
                <input type="text" name="pseudo" className="input-form" placeholder="Pseudonyme" onChange={handleChange} autoComplete="off" />
                <input type="email" name="email" className="input-form" placeholder="Email" onChange={handleChange} autoComplete="off" />
                <input type="password" name="password" className="input-form" placeholder="Mot de passe" onChange={handleChange} autoComplete="off" />
                <textarea name="description" className="input-form" placeholder="Bio..." onChange={handleChange} rows={6} autoComplete="off" />
                <input type="submit" value="S'inscrire" className="signup__form-send btn btn-send" />
                <ToastMessage open={open} handleClose={handleClose} toast={toast}></ToastMessage>
            </form>
        </div>
    )
}

export const FormTravel = () => {

    const [credentials, setCredentials] = useState({});
    const [tokenMapBox, setTokenMapBox] = useState('');
    const [radio, setRadio] = useState('');
    const [isCreatingMode, setIsCreatingMode] = useState(true);
    const [toast, setToast] = useState({});
    const [open, setOpen] = useState(false);
    const [showAddressInfos, setShowAddressInfos] = useState(false);
    const [showAddressLgn, setShowAddressLgn] = useState(false);
    const [feature, setFeature] = useState();
    const travelId = useParams('id').id;
    const navigate = useNavigate();

    /**
     * This function is used to validate the form
     * @param {*} values represents the fields of the form
     * @returns errors
     */
    const validate = values => {
        const errors = {};
        if (!values.title) {
            errors.title = errorTravelForm.title.required;
        } else if (values.title.length > 50) {
            errors.title = errorTravelForm.title.sentenceLength;
        }

        if (!values.activityType) {
            errors.activityType = errorTravelForm.activityType.required;
        } else if (values.activityType.length > 100) {
            errors.activityType = errorTravelForm.activityType.sentenceLength;
        }

        if (!values.address && showAddressLgn) {
            errors.address = errorTravelForm.address.required;
        } else if (values.address.length > 100) {
            errors.address = errorTravelForm.address.sentenceLength;
        }

        if (!values.description) {
            errors.description = errorTravelForm.description.required;
        }

        if (values.difficulty.length <= 0) {
            errors.difficulty = errorTravelForm.difficulty.required;
        }

        return errors;
    };

    /**
     * Fetch travel handle the information extraction
     * @returns a travel information
     */
    const fetchTravel = async () => {
        if (travelId) {
            try {
                const data = await getTravel(travelId);
                setCredentials(data[0]);
                setIsCreatingMode(false);
            } catch (error) {
                console.log(error);
            }
        } else {
            return;
        }
    }

    /**
     * Retrieves the different functions of formik and initializes the form fields
     */
    const formikbag = useFormik({
        initialValues: {
            title: !isCreatingMode ? credentials.title : '',
            activityType: !isCreatingMode ? credentials.activityType : '',
            description: !isCreatingMode ? credentials.description : '',
            difficulty: !isCreatingMode ? parseInt(credentials.difficulty) : '',
            address: !isCreatingMode ? credentials.address : '',
            country: !isCreatingMode ? credentials.country : '',
            city: !isCreatingMode ? credentials.city : '',
            postalCode: !isCreatingMode ? credentials.postalCode : '',
            time: !isCreatingMode ? credentials.time : ''
        },
        validate,
        enableReinitialize: true,
        onSubmit: values => {
            _submit(values);
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue } = formikbag;

    // parse string value to int
    const parseAndHandleChange = (value, setFieldValue, id) => {
        const parsed = parseInt(value, 10)
        setFieldValue(id, parsed)
    }

    /**
     * Handle the sending information
     * @param {*} values target values formik
     */
    const _submit = async (values) => {
        try {
            travelId ? await updateTravel(values, travelId) : await createTravel(values)
            setTimeout(() => {

                navigate('/travels')
            }, 2000)
        } catch (error) {
            console.log(error);
            setToast({
                message: isCreatingMode ? 'Erreur pendant la création' : 'Erreur pendant la mise à jour',
                severity: 'error'
            })
            handleClick(setOpen);
        }
    }

    /**
     * Use a callback to retrieve information
     */
    const handleRetrieve = useCallback(
        (res) => {
            const feature = res.features[0];
            setFeature(feature);
            setShowAddressInfos(true);
        },
        [setFeature]
    );

    useEffect(() => {
        fetchTravel();
        const accessToken = process.env.REACT_APP_MAP_BOX_TOKEN;
        setTokenMapBox(accessToken);
    }, [])

    return (
        <>

            <div className="form-travel">
                <h1>{isCreatingMode ? 'Création d\'une destination' : `Mise à jour de ${values.title}`}</h1>
                <div className="form-travel__content form-group">
                    <form onSubmit={handleSubmit}>

                        <label className='required'>Titre</label>
                        <input
                            id="title"
                            name="title"
                            placeholder="Titre"
                            className='input-form'
                            onBlur={handleBlur}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.title} />
                        {errors.title && touched.title ? <div className='error-form'>{errors.title}</div> : null}

                        <label className='required'>Type de l'activité</label>
                        <input
                            id="activityType"
                            name="activityType"
                            placeholder="Type d'activité"
                            className='input-form'
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.activityType} />
                        {errors.activityType && touched.activityType ? <div className='error-form'>{errors.activityType}</div> : null}

                        <label className='required'>Difficulté</label>
                        <div role="group" className='radio-group' aria-labelledby="my-radio-group">
                            <FormikProvider value={formikbag}>
                                {_.map(difficulties, (value, key) =>
                                    <label id={value.id} key={key}>
                                        <Field id={value.id} type="radio" onChange={() => parseAndHandleChange(value.id, setFieldValue, 'difficulty')} name="difficulty" className="radio-form" value={value.id} />
                                        {value.label}
                                    </label>
                                )}
                            </FormikProvider>
                        </div>
                        {errors.difficulty && touched.difficulty ? <div className='error-form'>{errors.difficulty}</div> : null}

                        <button type='button' className={`address-button ${showAddressLgn && 'check-address-button'}`} onClick={() => !showAddressLgn ? setShowAddressLgn(true) : setShowAddressLgn(false)}><FaAddressCard /> Une adresse ?</button>
                        {(showAddressLgn || values.address) &&
                            <>
                                <label className='required'>Adresse</label>
                                <AddressAutofill accessToken={tokenMapBox} onRetrieve={handleRetrieve}>
                                    <input
                                        id="address"
                                        className="input-form"
                                        placeholder="Exemple : 189 route de la ravine sèche"
                                        autoComplete="address-line1"
                                        name="address"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.address}
                                    />
                                </AddressAutofill>
                                {errors.address && touched.address ? <div className='error-form'>{errors.address}</div> : null}

                                {(showAddressInfos || values.address) &&
                                    <>
                                        <label>Pays</label>
                                        <input
                                            id="country"
                                            name="country"
                                            placeholder="Pays"
                                            className='input-form'
                                            variant="outlined"
                                            autoComplete='country-name'
                                            onChange={handleChange}
                                            value={values.country}
                                            readOnly />

                                        <label>Ville</label>
                                        <input
                                            id="city"
                                            name="city"
                                            placeholder="Ville"
                                            className='input-form'
                                            variant="outlined"
                                            autoComplete='address-level2'
                                            onChange={handleChange}
                                            readOnly
                                            value={values.city} />

                                        <label>Code postal</label>
                                        <input
                                            id="postalCode"
                                            name="postalCode"
                                            placeholder="Code postal"
                                            className='input-form'
                                            autoComplete='postal-code'
                                            variant="outlined"
                                            onChange={handleChange}
                                            readOnly
                                            value={values.postalCode} />
                                    </>
                                }
                            </>
                        }
                        <label className='required'>Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            className='input-form textarea-form'
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={10}
                            value={values.description} />
                        {errors.description && touched.description ? <div className='error-form'>{errors.description}</div> : null}

                        <Button type="submit" variant="contained">{isCreatingMode ? 'Créer' : 'Sauvegarder'}</Button>
                    </form>
                </div>
            </div>
            <ToastMessage open={open} handleClose={(e, reason) => handleClose(e, reason, setOpen)} toast={toast}></ToastMessage>
        </>
    )
}

export const FormAccount = ({ isAuthenticated, fetchUserInformations, setCredentials, credentials }) => {
    const [selectedFile, setSelectedFile] = useState();

    /**
     * Retrieves the different functions of formik and initializes the form fields
     */
    const formikbag = useFormik({
        initialValues: {
            lastName: credentials ? credentials.lastName : '',
            firstName: credentials ? credentials.firstName : '',
            description: credentials ? credentials.description : '',
            pseudo: credentials ? credentials.pseudo : ''
        },
        enableReinitialize: true,
        onSubmit: values => {
            _submit(values, selectedFile)
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formikbag;

    /**
     * Handle the sending information
     * @param {*} values target values formik
     */
    const _submit = async (values, selectedFile) => {
        const formData = new FormData();
        if (selectedFile) {
            formData.append("file", selectedFile);
        }
        try {
            await updateUser(values);
            selectedFile && await uploadProfileImg(formData);
            fetchUserInformations();
            setSelectedFile();
        } catch (error) {
            console.log(error);
        }
    }

    const handleFileSelect = (e) => {
        console.log(e.target.files);
        setSelectedFile(e.target.files[0])
    }

    return (
        <>
            <div className="form-group">

                <form onSubmit={handleSubmit}>
                    <label>Nom</label>
                    <input
                        className='input-form'
                        id="lastName"
                        name="lastName"
                        placeholder="Nom"
                        onBlur={handleBlur}
                        variant="outlined"
                        onChange={handleChange}
                        value={values.lastName} />

                    <label>Prénom</label>
                    <input
                        className='input-form'
                        id="firstName"
                        name="firstName"
                        placeholder="Prénom"
                        onBlur={handleBlur}
                        variant="outlined"
                        onChange={handleChange}
                        value={values.firstName} />

                    <label>Bio</label>
                    <input
                        className='input-form'
                        id="description"
                        name="description"
                        placeholder="Bio"
                        onBlur={handleBlur}
                        variant="outlined"
                        onChange={handleChange}
                        value={values.description} />

                    <label>Pseudonyme</label>
                    <input
                        className='input-form'
                        id="pseudo"
                        name="pseudo"
                        placeholder="Pseudonyme"
                        onBlur={handleBlur}
                        variant="outlined"
                        onChange={handleChange}
                        value={values.pseudo} />

                    <input
                        className='input-form'
                        name="profilImg"
                        id="profilImg"
                        type="file"
                        onChange={handleFileSelect} />

                    <Button type="submit" variant="contained">Sauvegarder</Button>
                </form>
            </div>
        </>
    )
}