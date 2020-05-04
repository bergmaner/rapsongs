import React,{ useState, useContext } from 'react';
import { FirebaseContext } from '../services/Firebase';
import { Form } from '../components/Form';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const Login = () => {

    const [ formValues, setFormValues ] = useState({email: '', password: ''});
    const { firebase } = useContext(FirebaseContext);
    function handleSubmit(e){
        e.preventDefault();
        firebase.login({ email: formValues.email, password: formValues.password });
    }

    function handleInputChange(e){
        e.persist();
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    return(
  <section>
  <Form onSubmit = {handleSubmit}>
      <Input name = "email" value = {formValues.email} onChange = {handleInputChange} placeholder = "email" type = "email"/>
      <Input  name = "password" value = {formValues.password}  onChange = {handleInputChange} placeholder = "password" type = "password"/>
      <Button type = "submit"block>Login</Button>
  </Form>
  </section>
    )
}

export default Login;
