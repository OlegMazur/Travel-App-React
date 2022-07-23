import React, { useEffect, useState } from 'react';
import './header.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Svggenerator from '../../../assets/svggenerator/svggenerator';
import { svgName } from '../../../assets/svggenerator/enums';
import {
  useAppDispatch,
  useAppSelector
} from '../../../helpers/hooks/useStoreHooks';
import { profileActionCreator } from '../../../store/actions';
const Header: React.FC = () => {
  const searchParams = useLocation();
  const navigate = useNavigate();
  const [isHidden, setIsHiden] = useState<boolean>(false);
  const user = useAppSelector(state => state.profile.user);
  const hasUser = Boolean(user);
  const dispatch = useAppDispatch();
  const signOutHandler = () => {
    dispatch(profileActionCreator.signout(null));
  };
  useEffect(() => {
    switch (searchParams.pathname) {
      case '/sign-in': {
        setIsHiden(true);
        break;
      }
      case '/sign-up': {
        setIsHiden(true);
        break;
      }
      case '/': {
        setIsHiden(false);
        break;
      }
    }
  }, [searchParams.pathname]);

  useEffect(() => {
    if (!hasUser) {
      navigate('/sign-in', { replace: true });
    }
  }, [dispatch, user, hasUser]);
  return (
    <header className="header">
      <div className="header__inner">
       {hasUser? <Link to="/" className="header__logo">
          Travel App
        </Link>:<div className="header__logo">Travel App</div> }
        <nav className="header__nav" hidden={isHidden}>
          <ul className="nav-header__list">
            <li className="nav-header__item" title="Bookings">
              <Link to="bookings" className="nav-header__inner">
                <span className="visually-hidden"></span>
                <Svggenerator
                  name={svgName.BRIEFCASE}
                  className="visually-hidden"
                />
              </Link>
            </li>
            <li className="nav-header__item" title="Profile">
              <div className="nav-header__inner profile-nav" tabIndex={0}>
                <span className="visually-hidden"></span>
                <Svggenerator name={svgName.USER} />
                <ul className="profile-nav__list">
                  <li className="profile-nav__item profile-nav__username">
                    {user?.fullName || ''}
                  </li>
                  <li className="profile-nav__item">
                    <button className="profile-nav__sign-out button" onClick={signOutHandler}>
                      <Link to="sign-in" >
                        Sign Out
                      </Link>
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
