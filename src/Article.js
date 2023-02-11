

import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import MdContent from './MdContent';

let counter=0;
export default function Article() {
    const navigate=useNavigate();
    const { articleName } = useParams();
    const [loading, setLoading] = useState(true);

    const [article, setArticle] = useState(
        {
            articleName: articleName,
            tags: ['tag1', 'tag2', 'tag3'],
            difficultyType: 'medium',
            content: 'This is the article content in markdown',
            createdAt: '00/00/0000',
            views: 100,
            likes: 4,
            contributedBy: 'xyz'
        }
    );
    const fetchArticle = () => {
            fetch(`http://localhost:8086/articles/get/${articleName}`, {
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
                        setArticle(response);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
        }
    const handleLike=()=>{
        fetch(`http://localhost:8086/articles/like/${articleName}`, {
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
                        setArticle({...article,likes:response.likes})
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
    }
    useEffect(() => {
        console.log("useEffect called",++counter);
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
                                <Card.Header as="h5">{article.articleName}</Card.Header>
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
                                            <Col sm={8}>
                                                Views: {article.views}
                                            </Col>
                                            <Col sm={4} className="text-right">
                                                <FavoriteBorderIcon style={{ color: 'red' }} onClick={handleLike}/> {article.likes}
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col>
                                                <strong>Contributed by:</strong> 
                                                <Badge variant="light" className="mr-1 mb-1" style={{'cursor':'pointer'}} onClick={()=>navigate(`/profile/${article.creatorName}`)}>{article.creatorName}</Badge>
                                            </Col>
                                        </Row>
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
                                                            <Badge variant="light" key={tag} className="mr-1 mb-1" style={{'cursor':'pointer'}} onClick={()=>navigate(`/article/tag/${tag}`)}>{tag}</Badge>
                                                            &nbsp;
                                                        </>
                                                    ))
                                                }
                                            </Col>

                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </ConditionalRendering>
            
        </>

    );

}
