import React, { useState, useEffect } from "react";
import {useHistory, Link} from 'react-router-dom'
import { useForm } from "./form-hook";
import AuthService from "../services/auth.service";
import Button from "./Button";
import Input from "./Input";
import ToastAjout from '../Toasts/ToastAjout'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTHPASS,
  VALIDATOR_PASSWORD_MATCH,
  VALIDATOR_REQUIRE,
  VALIDATOR_USERMATCH,
} from "../util/validators.js";
import "./Register.css";

export default function NewPlace(props) {

  const History = useHistory();
  const [show, setShow] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      rePassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = (event) => {
      event.preventDefault();
      AuthService.register(formState.inputs.username.value, formState.inputs.password.value)
                  .then(() => {
                    setShow(true);
                    setTimeout(() => setShow(false), 2000);
                    setTimeout(() => History.push('/login'), 1500);
                  });
  };
    useEffect(() => { getPassValue(); }, [formState]);

    var pass = "";
    
    const getPassValue = () => {
      console.log("use Effect pass check ");
      if (document.getElementById("password").value !== null) 
      {
        pass = document.getElementById("password").value;
      } 
    };

  return (
    <div className="col-md-4" style={{"display":"block","margin":"auto"}}>
      <div style={{"display": show ? "block" : "none"}}>
            <ToastAjout children = {{show: show, message:"Utilisateur ajoutée avec succès.",type:"success"}}/> 
      </div>

      <h2 style={{"width":"100%","display":"block","margin":"auto"}} >MiolaProjects Register</h2>
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

      <form className="register-form" onSubmit={formSubmitHandler}>
            
        <Input
          id="username"
          element="input"
          type="text"
          placeholder="Username"
          errorText="User already exist"
          validators={[VALIDATOR_USERMATCH()]}
          onInput={inputHandler}
        ></Input>
        <Input
          id="email"
          element="input"
          type="text"
          placeholder="Email"
          errorText="please enter a valide Email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        ></Input>

        <Input
          id="password"
          element="input"
          type="password"
          placeholder="Password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTHPASS(8)]}
          errorText="Please enter a valid password (at least 8 characters)."
          onInput={inputHandler}
        />

        <Input
          id="rePassword"
          placeholder="Confirm Password"
          element="input"
          type="password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD_MATCH(pass)]}
          errorText="Passwords didn't match"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Register
        </Button>
      </form>
      </div>
      <div>
                <h2>Vous avez déja un compte?</h2>
                 <Link to={"/login"}>Cliquez ici</Link> pour vous connecter.
            </div>
    </div>
  );
}
