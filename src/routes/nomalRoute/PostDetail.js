import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Button, Col, Container, Row } from 'reactstrap';
import {
  COMMENT_DELETE_REQUEST,
  COMMENT_LOADING_REQUEST,
  POST_DELETE_REQUEST,
  POST_DETAIL_LOADING_REQUEST,
  USER_LOADING_REQUEST,
} from '../../redux/types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// eslint-disable-next-line no-unused-vars
import BallonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { GrowingSpinner } from '../../components/spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faCommentDots,
  faMouse,
} from '@fortawesome/free-solid-svg-icons';
import { editorConfiguration } from '../../components/editor/EditorConfig';
import Comments from '../../components/comments/Comments';
const PostDetail = (req) => {
  const dispatch = useDispatch();
  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post,
  );
  const { userId, userName } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => {
    console.log(state, 'state comment');
    return state.comment;
  });

  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem('token'),
    });
    dispatch({
      type: COMMENT_LOADING_REQUEST,
      payload: req.match.params.id,
    });
  }, [dispatch, req.match.params.id]);

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem('token'),
      },
    });
  };

  const onCommentDeleteClick = (e) => {
    const commentBox = comments;
    console.warn(e.target.id, 'e info');
    console.error(commentBox, 'comment state');
    /*
    const filterBox = commentBox.filter(
      (comments) => comments._id !== e.target.id,
    );
    console.warn(filterBox, 'filter');
    */
    const comment = commentBox.filter(
      (comments) => comments._id === e.target.id,
    );
    const { _id, creator } = comment[0];
    console.warn(creatorId, ' creator Id');
    console.warn(creator, ' comment creator');
    console.warn(_id, ' comment Id');
    if (!userId) {
      alert('로그인이 필요합니다.');
    } else {
      if (creatorId === creator) {
        if (e.target.id === _id) {
          if (window.confirm('댓글을 삭제하시겠습니까?')) {
            dispatch({
              type: COMMENT_DELETE_REQUEST,
              payload: {
                post_id: req.match.params.id,
                id: e.target.id,
                token: localStorage.getItem('token'),
              },
            });
          }
        } else {
          alert('같은 작성자 다른 댓글');
        }
      } else {
        alert('다른 작성자의 글은 관리자 외에는 수정,삭제가 불가능합니다.');
      }
    }
  };
  const EditButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-primary btn-block custom-btn">
            ← Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block custom-btn"
          >
            Edit Post
          </Link>
        </Col>
        <Col className="col-md-3">
          <Button
            className="btn-block btn-danger custom-btn"
            onClick={onDeleteClick}
          >
            Delete Post
          </Button>
        </Col>
      </Row>
    </Fragment>
  );

  const HomeButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3">
          <Link to="/" className="btn btn-primary btn-block custom-btn">
            ← Home
          </Link>
        </Col>
      </Row>
    </Fragment>
  );

  const Body = (
    <>
      {userId === creatorId ? EditButton : HomeButton}
      <Row className="border-bottom border-top border-primary p-3 mb-3 d-flex justify-content-between nameTag">
        {(() => {
          if (postDetail && postDetail.creator) {
            return (
              <Fragment>
                <div className="NameTagFont col-6">
                  <span className="mr-3 categorySection">
                    {postDetail.category.categoryName === '공지사항' ? (
                      <Button color="warning">
                        {postDetail.category.categoryName}
                      </Button>
                    ) : (
                      <Button color="info">
                        {postDetail.category.categoryName}
                      </Button>
                    )}
                  </span>
                  {postDetail.title}
                </div>
                <div className="align-self-end col-6 custom-col6">
                  {postDetail.creator.name}
                </div>
              </Fragment>
            );
          }
        })()}
      </Row>
      {postDetail && postDetail.comments ? (
        <Fragment>
          <div className="d-flex justify-content-end align-items-baseline small">
            <FontAwesomeIcon icon={faPencilAlt} />
            &nbsp;
            <span> {postDetail.date}</span>
            &nbsp; &nbsp;
            <FontAwesomeIcon icon={faCommentDots} />
            &nbsp;
            <span>{postDetail.comments.length}</span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faMouse} />
            <span>{postDetail.views}</span>
          </div>
          <Row className="mb-3">
            <CKEditor
              editor={BalloonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
          </Row>
          <Row>
            <Container className="mb-3 border border-blue rounded">
              {Array.isArray(comments)
                ? comments.map(
                    ({ contents, creator, date, _id, creatorName }) => (
                      <div key={_id} className="comment-custom">
                        <Row className="justify-content-between p-2 ">
                          <div className="font-weight-bold col-6">
                            {creatorName ? creatorName : creator}
                          </div>
                          <div className="text-small col-6 custom-col6">
                            <span className="font-weight-bold">
                              {date.split(' ')[0]}
                            </span>
                            <span className="font-weight-light">
                              {' '}
                              {date.split(' ')[1]}
                            </span>
                            <div
                              id={_id}
                              className="custom-commentbtn custom-commentedit"
                            >
                              수정
                            </div>
                            <div
                              id={_id}
                              className="custom-commentbtn custom-commentdelete"
                              onClick={onCommentDeleteClick}
                            >
                              삭제
                            </div>
                          </div>
                        </Row>
                        <Row className="p-2">
                          <div>{contents}</div>
                        </Row>
                        <hr />
                      </div>
                    ),
                  )
                : 'Creator'}
              <Comments
                id={req.match.params.id}
                userId={userId}
                userName={userName}
              />
            </Container>
          </Row>
        </Fragment>
      ) : (
        <h1>s</h1>
      )}
    </>
  );
  return (
    <div>
      <Helmet title={`Post | ${title}`} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  );
};

export default PostDetail;
