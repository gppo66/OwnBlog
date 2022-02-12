import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';

const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>젤베의 개인적인 블로그</h1>
          <p>하고 싶은거 다 하는 블로그</p>
          <Link to="/aboutMe">
            <Button outline color="light" className="mt-2" block>
              젤리베어에 대해 알고싶다면
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
