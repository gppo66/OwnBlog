import React from 'react';
import { Col, Container, Row } from 'reactstrap';
const MyProfile = () => {
  return (
    <>
      <Container className="MyProfile-custom MyProfile-img-custom">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }} className="colName-custom">
            <h3 className="name-custom">
              박경훈 <br />
              <br />
              "삶의 일부분이 되는 프로그램 개발자"
            </h3>
          </Col>
          <Col sm="12" md={{ size: 6, offset: 3 }} className="">
            <hr className="borderline-custom" />
          </Col>
          <Col
            sm="12"
            md={{ size: 6, offset: 3 }}
            className="colComment-custom"
          >
            <h4 className="name-custom">
              항상 사용자 친화적인 프로그램을 <br />
              만들기 위해 공부하고,
              <br /> 무엇이든 긍정적이고 적극적인 태도로 <br />
              주변사람들에게 좋은 영향을 끼치고 싶습니다.
            </h4>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyProfile;
