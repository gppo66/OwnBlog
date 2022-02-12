import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMENT_UPLOADING_REQUEST,
  COMMENT_LOADING_REQUEST,
} from '../../redux/types';
import { Form, FormGroup, Input, Button, Row, Alert } from 'reactstrap';

const Comments = ({ id, userName, userId }) => {
  const dispatch = useDispatch();
  const [form, setValues] = useState({ contents: '' });

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { contents } = form;
    const token = localStorage.getItem('token');
    const body = {
      contents,
      token,
      id,
      userId,
      userName,
    };

    console.log(body);
    if (body.userId) {
      dispatch({
        type: COMMENT_UPLOADING_REQUEST,
        payload: body,
      });
      resetValue.current.value = '';
      setValues('');
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const resetValue = useRef(null);

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form.contents);
  };

  useEffect(() => {
    dispatch({
      type: COMMENT_LOADING_REQUEST,
      payload: id,
    });
  }, [dispatch, id]);
  return (
    <>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Row className="p-2">
            <div className="font-weight-bold m-1">댓글을 달아주세요 </div>
            <div className="my-1" />
            <Input
              innerRef={resetValue}
              type="textarea"
              name="contents"
              id="contents"
              onChange={onChange}
              placeholder="Comment"
            />
            <Button
              color="primary"
              block
              className="mt-2 offset-md-10 col-md-2 "
            >
              Submit
            </Button>
          </Row>
        </FormGroup>
      </Form>
    </>
  );
};

export default Comments;
