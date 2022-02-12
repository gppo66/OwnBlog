import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge } from 'reactstrap';

const Category = ({ posts }) => {
  console.log(posts);
  return (
    <>
      {Array.isArray(posts)
        ? posts.map(({ _id, categoryName, posts }) => (
            <div key={_id} className="ml-1 mt-1 my_category custom-row">
              <Link
                to={`/post/category/${categoryName}`}
                className="text-dark text-decoration-none"
              >
                <span className="ml-1">
                  {categoryName === '공지사항' ? (
                    <Button color="warning">
                      {categoryName} <Badge color="light">{posts.length}</Badge>
                    </Button>
                  ) : (
                    <Button color="info">
                      {categoryName} <Badge color="light">{posts.length}</Badge>
                    </Button>
                  )}
                </span>
              </Link>
            </div>
          ))
        : ''}
    </>
  );
};

export default Category;
