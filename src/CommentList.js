import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { FaHeart, FaComment } from 'react-icons/fa';
import Comment from './Comment';
import CreateComment from './CreateComment';

function CommentList(props) {
  const comments = props.comments;
  

  
  return (
    <Card className="mb-4">
      <Card.Header>Comments</Card.Header>
      <Card.Body>
        {/* <CreateComment/> */}
        <hr />
        {/* {comments.map(comment => (
          <Comment comment={comment}/>
        ))} */}
        {comments.map((comment) => (
        <div key={comment.commentId}>
          <Comment comment={comment} />
          
        </div>
      ))}
      </Card.Body>
    </Card>
  );
}

export default CommentList;
