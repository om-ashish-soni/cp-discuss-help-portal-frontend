
import React, { useState } from 'react'
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { FaHeart, FaComment } from 'react-icons/fa';
import CommentList from './CommentList';
import CreateComment from './CreateComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MdContent from './MdContent';

export default function Comment({ comment }) {
    const [replyingTo, setReplyingTo] = useState(false);

    const handleReplyClick = () => {
        setReplyingTo(!replyingTo)
    };
    const handleCommentSubmit = (comment) => {
        console.log('New comment:', comment);
        setReplyingTo(false);
    };
    const handleLike = (e) => {
        e.preventDefault();
    }
    return (
        <div key={comment.commentId} className="mb-4">

            <Row>
                <Col sm={9}>
                    {comment.creatorName}
                </Col>
                <Col sm={1} >
                    <Button variant="link" size="sm" className="text-muted ml-3" onClick={handleReplyClick} >
                        <ChatBubbleOutlineIcon style={{ color: 'dodgerblue' }} className="mr-1" />
                    </Button>
                </Col>
                <Col sm={2} className="text-right">

                    <FavoriteBorderIcon style={{ color: 'red' }} onClick={handleLike} /> {comment.likes}
                </Col>
                
            </Row>
            <div className="d-flex align-items-center mb-2">
                <div className="avatar rounded-circle bg-secondary mr-2" />
                <div>
                    {/* <h5 className="mb-1">{comment.content}</h5> */}
                    <MdContent data={comment.content} showThemeOption={false}/>
                    <small className="text-muted">
                        {comment.createdAt.toLocaleString()}
                    </small>
                </div>
            </div>
            
            <div>
                {replyingTo && (

                    <CreateComment parentId={comment.commentId} onSubmit={handleCommentSubmit} />
                )}
            </div>
            {comment.comments && comment.comments.length > 0 && (
                <div className="pl-5">
                    <CommentList comments={comment.comments} />
                </div>
            )}
        </div>
    )
}
