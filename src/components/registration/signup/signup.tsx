import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputsNames } from '../../../common/enums/input/inputName';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/useStoreHooks';
import { profileActionCreator } from '../../../store/actions';

import './signup.scss';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [fullNameDirty, setFullNameDirty] = useState(false);
  const [emailError, setEmailError] = useState('email cannot be empty ');
  const [passwordError, setPasswordError] = useState(
    'password cannot be empty '
  );
  const [fullNameError, setFullNameError] = useState('Name cannot be empty ');
  const [formValid, setFormValid] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.profile.user);
  const hasUser = Boolean(user);
  useEffect(() => {
    if (hasUser) {
      navigate('/', { replace: true });
      
    }
  }, [dispatch, user,hasUser]);
  useEffect(() => {
    if (emailError || passwordError || fullNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, fullNameError]);

  const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case InputsNames.EMAIL:
        setEmailDirty(true);
        break;
      case InputsNames.PASSWORD:
        setPasswordDirty(true);
        break;
      case InputsNames.FULL_NAME:
        setFullNameDirty(true);
        break;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fullName = event.target.value;
    const email = event.target.value;
    const password = event.target.value;
    switch (event.target.name) {
      case InputsNames.EMAIL:
        setEmail(email);
        const re = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/;
        if (!re.test(String(email).toLowerCase())) {
          setEmailError(' invalid email addres');
        } else {
          setEmailError('');
        }
        break;
      case InputsNames.PASSWORD:
        setPassword(password);
        if (password.length < 3 || password.length > 20) {
          setPasswordError('password must be between 3 and 20 characters');
          if (!password) {
            setPasswordError('password cannot be empty');
          }
        } else {
          setPasswordError('');
        }
        break;
      case InputsNames.FULL_NAME:
        setFullName(fullName);
        if (!fullName) {
          setFullNameError('name cannot be empty');
        } else {
          setFullNameError('');
        }
        break;
    }
  };
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(profileActionCreator.register({ fullName, email, password }));
  }
  return (
    <main className="sign-up-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form className="sign-up-form" onSubmit={handleSubmit} autoComplete="on">
        <h2 className="sign-up-form__title">Sign Up</h2>
        <label className="trip-popup__input input">
          {fullNameError && fullNameDirty && <div>{fullNameError}</div>}
          <span className="input__heading">Full name</span>
          <input
            name="full-name"
            type="text"
            value={fullName}
            onChange={handleChange}
            onBlur={blurHandler}
            required
          />
        </label>
        <label className="trip-popup__input input">
          {emailError && emailDirty && <div>{emailError}</div>}
          <span className="input__heading">Email</span>

          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            onBlur={blurHandler}
            required
          />
        </label>
        <label className="trip-popup__input input">
          {passwordError && passwordDirty && <div>{passwordError}</div>}
          <span className="input__heading">Password</span>
          <input
            name="password"
            type="password"
            value={password}
            onBlur={blurHandler}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </label>
        <button disabled={!formValid} className="button" type="submit">
          Sign Up
        </button>
      </form>
      <span>
        Already have an account?
        <Link to="/sign-in" className="sign-up-form__link">
          Sign in
        </Link>
      </span>
    </main>
  );
}

export default SignUp;
