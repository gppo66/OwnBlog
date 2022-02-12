import React, { Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppNavBar from '../components/AppNavbar';
import { Container } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import PostCardList from './nomalRoute/PostCardList';
import PostWrite from './nomalRoute/PostWrite';
import PostDetail from './nomalRoute/PostDetail';
import Search from './nomalRoute/Search';
import CategoryResult from './nomalRoute/CategoryResult';
import {
  EditProtectedRoute,
  ProfileProtectedRoute,
} from './protectedRoute/ProtectedRoute';
import PostEdit from './nomalRoute/PostEdit';
import Profile from './nomalRoute/Profile';
import AboutMe from './nomalRoute/AboutMe';

const MyRouter = () => (
  <Fragment>
    <AppNavBar />
    <Switch>
      <Route path="/aboutMe" exact component={AboutMe} />
    </Switch>
    <Header />
    <Container id="main-body">
      <Switch>
        <Route path="/" exact component={PostCardList} />
        <Route path="/post" exact component={PostWrite} />
        <Route path="/post/:id" exact component={PostDetail} />
        <EditProtectedRoute path="/post/:id/edit" exact component={PostEdit} />
        <Route
          path="/post/category/:categoryName"
          exact
          component={CategoryResult}
        />
        <ProfileProtectedRoute
          path="/user/:userName/profile"
          exact
          component={Profile}
        />
        <Route path="/search/:searchTerm" exact component={Search} />
        <Route path="/aboutMe" exact />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
    <Footer />
  </Fragment>
);

export default MyRouter;
