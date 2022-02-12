import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {
  Navbar,
  Container,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Form,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LOGOUT_REQUEST,
  POSTS_WRITE_REQUEST,
  USER_LOADING_REQUEST,
} from '../redux/types';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import SearchInput from './search/SearchInput';
const AppNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, userRole } = useSelector(
    (state) => state.auth,
  );
  console.log(userRole, 'UserRole');
  console.log(user, 'user info');

  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  useEffect(() => {
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem('token'),
    });
  }, [dispatch, isAuthenticated]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addPostClick = () => {
    dispatch({
      type: POSTS_WRITE_REQUEST,
    });
  };
  const authLink = (
    <Fragment>
      <NavItem>
        {userRole === 'MainAdmin' ? (
          <Form className="col mt-2">
            <Link
              to="/post"
              className="btn btn-success block text-white px-3 ml-3"
              onClick={addPostClick}
            >
              Add Post
            </Link>
          </Form>
        ) : (
          ''
        )}
      </NavItem>
      <NavItem className="d-flex justify-content-center ml-auto">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link to={`/user/${user.name}/profile`}>
              <Button outline color="light" className="px-3 " block>
                <strong>{user ? `Welcome ${user.name}` : ''}</strong>
              </Button>
            </Link>
          ) : (
            <Button outline color="light" className="px-3 " block>
              <strong>"Cannot Find User"</strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} to="#">
            <Button outline color="light" className="mt-2" block>
              Logout
            </Button>
          </Link>
        </Form>
      </NavItem>
    </Fragment>
  );

  const guestLink = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );
  return (
    <Fragment>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container>
          <Link
            to="/"
            className="text-white text-decoration-none navLogo-custom-set"
          >
            JellyBear
          </Link>

          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <SearchInput isOpen={isOpen} />
            <Nav className="ml-3 d-flex justify-content-around " navbar>
              {isAuthenticated ? authLink : guestLink}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default AppNavBar;
