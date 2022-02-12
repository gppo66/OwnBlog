import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const MyInformation = () => {
  return (
    <div>
      <Container className="MyProfileDetail-custom">
        <Row>
          <Col className="colName-custom">
            <h3 className="about-custom">ABOUT ME</h3>
          </Col>
        </Row>
        <Row>
          <Col sm="4" md={{ size: 2, offset: 3 }}>
            <p>
              <b>이름</b> <br />
              박경훈
            </p>
          </Col>
          <Col sm="4" md={{ size: 2 }}>
            <p>
              <b>생년월일</b> <br />
              1997.03.23
            </p>
          </Col>
          <Col sm="4" md={{ size: 2 }}>
            <p>
              <b>거주지</b> <br />
              서울특별시 광진구
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm="4" md={{ size: 2, offset: 3 }}>
            <p>
              <b>이메일</b> <br />
              <a
                href="mailto:gppo66@naver.com"
                target="blank"
                rel="noreferrer"
                className="mail-custom"
              >
                gppo66@naver.com
              </a>
            </p>
          </Col>
          <Col sm="4" md={{ size: 2 }}>
            <p>
              <b>학력</b> <br />
              한성대학교 <br />
              컴퓨터공학 전공
            </p>
          </Col>
          <Col sm="4" md={{ size: 2 }}>
            <p>
              <b>병역</b> <br />
              사이버작전사령부 <br />
              SW개발병
              <br />
              육군 병장 만기 전역
            </p>
          </Col>
          <Col sm="12" md={{ size: 6, offset: 3 }} className="">
            <hr className="borderlineblack-custom" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyInformation;
