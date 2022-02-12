import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import MyInformation from '../../components/portfolio/Section.js/MyInformation';
import MyProfile from '../../components/portfolio/Section.js/MyProfile';
import MySkill from '../../components/portfolio/Section.js/MySkill';

const AboutMe = () => {
  return (
    <Fragment>
      <Helmet title="JB's info" />
      <MyProfile />
      <MyInformation />
      <MySkill />
    </Fragment>
  );
};

export default AboutMe;
