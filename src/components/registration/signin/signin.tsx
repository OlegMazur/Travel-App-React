import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector
} from '../../../helpers/hooks/useStoreHooks';
import { profileActionCreator } from '../../../store/actions';

import './signin.scss';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.profile.user);
  const hasUser = Boolean(user);
  useEffect(() => {
    if (hasUser) {
      navigate('/', { replace: true });
    }
  }, [dispatch, user, hasUser, navigate]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    const password = event.target.value;
    if (event.target.name === 'email') {
      setEmail(email);
    }
    if (event.target.name === 'password') {
      setPassword(password);
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(profileActionCreator.signin({ email, password }));
  };
  const signOutHandler = () => {
    navigate('/sign-up', { replace: true });
    dispatch(profileActionCreator.signout(null));
  };
  return (
    <main className="sign-in-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form className="sign-in-form" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="sign-in-form__title">Sign In</h2>
        <label className="trip-popup__input input">
          <span className="input__heading">Email</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Password</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </label>
        <button className="button" type="submit">
          Sign In
        </button>
      </form>
      <span>
        Do not have an account yet?
        <Link
          to="/sign-up"
          className="sign-in-form__link"
          onClick={signOutHandler}
        >
          Sign Up
        </Link>
      </span>
    </main>
  );
}

export default SignIn;
