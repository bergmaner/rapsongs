import React, { useState, useContext } from 'react';
import { Form } from '../components/Form';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { FirebaseContext } from '../services/Firebase';

const Register = () => {

    const [ formValues, setFormValues ] = useState({
        email: '', password: '', passwordConfirmation: '', username: ''
    });
    const [ error, setError ] = useState('');
    const { firebase } = useContext(FirebaseContext) || {};
    function handleSubmit(e){
        e.preventDefault();
        if( formValues.password === formValues.passwordConfirmation ){
            firebase.register({ 
                username: formValues.username,
                email: formValues.email,
                password: formValues.password,
                passwordConfirmation: formValues.passwordConfirmation
            }).catch(err => {
                setError(err.message);
            });
        }
        else{
            setError('Password and passwordConfirmation must be this same');
        }
        
    }
    function handleChange(e){
        e.persist();
        setError('');
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <Form onSubmit = { handleSubmit }>
            <Input value = { formValues.username } name = "username" onChange = {handleChange} placeholder = 'username' type = 'text' required/>
            <Input value = { formValues.email } name = "email" onChange = {handleChange} placeholder = 'email' type = 'email' required/>
            <Input value = { formValues.password } name = "password" onChange = {handleChange} placeholder = 'password' type = 'password' required minLength = {6}/>
            <Input value = { formValues.passwordConfirmation } name = "passwordConfirmation" onChange = {handleChange} placeholder = 'confirm password' type = 'password' required minLength = {6}/>
    {error && <span style = {{ color: 'red' }}>{ error }</span>}
            <Button type = "submit"block>Register</Button>
        </Form>
    )
}
export default Register;