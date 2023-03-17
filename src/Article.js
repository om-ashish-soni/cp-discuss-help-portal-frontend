

import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect } from 'react';
import { Spinner, ListGroup, ListGroupItem } from 'react-bootstrap';
import MdContent from './MdContent';
import CommentList from './CommentList';
import CreateComment from './CreateComment';
import { IoIosChatbubbles } from 'react-icons/io';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

let counter = 0;
export default function Article() {
    const navigate = useNavigate();
    const { articleName } = useParams();
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState(false);


    const [article, setArticle] = useState(
        {
            articleId:'',
            articleName: articleName,
            tags: ['tag1', 'tag2', 'tag3'],
            difficultyType: 'medium',
            content: 'This is the article content in markdown',
            createdAt: '00/00/0000',
            views: 100,
            likes: 4,
            contributedBy: 'xyz',
            comments: []
        }
    );
    const handleReplyClick = () => {
        setReplyingTo(!replyingTo)
    };
    const refineArticle = (myarticle) => {
        if (!myarticle.comments) myarticle.comments = []
        return myarticle;
    }
    const fetchArticle = () => {
        fetch(`/articles/get/${articleName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())
            .then((response) => {
                console.log(response);

                if (response.error) {
                    throw response.error;
                } else {

                    setLoading(false);
                    console.log("response article : ",response);
                    setArticle(refineArticle(response));
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }
    const handleLike = () => {
        fetch(`/articles/like/${articleName}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())
            .then((response) => {
                console.log(response);

                if (response.error) {
                    throw response.error;
                } else {
                    // fetchArticle();                        
                    setArticle({ ...article, likes: response.likes })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleCommentSubmit=(articleName,content)=>{
        console.log("in handle comment submit of article.js",articleName,content);
        fetch(`/comments/ofarticle/create/${articleName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                content:content
            })
        }).then((response) => response.json())
            .then((response) => {
                console.log(response);

                if (response.error) {
                    throw response.error;
                } else {
                    fetchArticle();                        
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        console.log("useEffect called", ++counter);
        fetchArticle();
    }, []);
    const ConditionalRendering = ({ loading, children }) => {
        return loading ? (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="sr-only"></span>
                </Spinner>
            </div>
        ) : (
            children
        );
    };

    return (
        <>
            <ConditionalRendering loading={loading}>
                <Container className="mt-5">
                    <Row>
                        <Col>
                            <Card className="p-3">
                                <Card.Header as="h5">{article.name}</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <Row>
                                            <Col sm={8}>
                                                Difficulty level: <Badge variant={article.difficultyType === 'medium' ? 'secondary' : 'light'}>{article.difficultyType}</Badge>
                                            </Col>
                                            <Col sm={4} className="text-right">
                                                Published on: {new Date(article.createdAt).toLocaleDateString()}
                                            </Col>
                                        </Row>
                                        <hr />
                                        <MdContent data={article.content} className="mb-3"></MdContent>

                                        <hr />
                                        
                                        
                                        <Row>
                                            <Col>
                                                <strong>Contributed by:</strong>
                                                <Badge variant="light" className="mr-1 mb-1" style={{ 'cursor': 'pointer' }} onClick={() => navigate(`/profile/${article.creatorName}`)}>{article.creatorName}</Badge>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row className="mt-3">
                                            <Col>
                                                <strong>Tags:</strong>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {
                                                    article.tags.map(tag => (
                                                        <>
                                                            <Badge variant="light" key={tag} className="mr-1 mb-1" style={{ 'cursor': 'pointer' }} onClick={() => navigate(`/article/tag/${tag}`)}>{tag}</Badge>
                                                            &nbsp;
                                                        </>
                                                    ))
                                                }
                                            </Col>

                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col sm={4}>
                                                Views: {article.views}
                                            </Col>
                                            <Col sm={4} className="text-right">
                                                <FavoriteBorderIcon style={{ color: 'red' }} onClick={handleLike} /> {article.likes}
                                            </Col>
                                            <Col sm={4} >
                                            <Button variant="link" size="sm" className="text-muted ml-3" onClick={handleReplyClick} >
                                                <ChatBubbleOutlineIcon style={{ color: 'dodgerblue' }} className="mr-1" />
                                                {/* Reply */}
                                            </Button>
                                            </Col>
                                        </Row>
                                        
                                    </Card.Text>
                                    <div>
                                        {replyingTo && (
                                            <CreateComment articleName={article.name} onSubmit={handleCommentSubmit} />
                                        )}
                                    </div>
                                    <CommentList comments={article.comments} />
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            </ConditionalRendering>

        </>

    );

}
