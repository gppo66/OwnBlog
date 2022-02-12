import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const MySkill = () => {
  return (
    <div>
      <Container className="MyProfileDetaillong-custom">
        <Row>
          <Col className="colName-custom">
            <h3 className="about-custom">SKILLS</h3>
          </Col>
        </Row>
        <Row>
          <Col sm="4" md={{ size: 2, offset: 3 }}>
            <p>
              <b>Front-end</b> <br />
              HTML, CSS, JS
              <br />
              Sass
              <br />
              React
              <br />
              Redux
              <br />
              Saga
              <br />
              JQUERY
              <br />
            </p>
          </Col>
          <Col sm="4" md={{ size: 2 }}>
            <p>
              <b>Back-end</b> <br />
              JSP
              <br />
              Spring
              <br />
              Spring Boot
              <br />
              Node Express
              <br />
            </p>
          </Col>
          <Col sm="4" md={{ size: 2 }}>
            <p>
              <b>Deployment</b> <br />
              Amazon Web Services
              <br />
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm="4" md={{ size: 2, offset: 3 }}>
            <p>
              <b>Version Control</b> <br />
              Git <br />
              GitHub
              <br />
            </p>
          </Col>
          <Col sm="4" md={{ size: 2 }}>
            <p>
              <b>Communication</b> <br />
              Figma
              <br />
              Slack
              <br />
              Swit
              <br />
            </p>
          </Col>
          <Col sm="4" md={{ size: 2 }}>
            <p>
              <b>Certificate</b> <br />
              정보처리기사
              <br />
              네트워크관리사2급
              <br />
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MySkill;
