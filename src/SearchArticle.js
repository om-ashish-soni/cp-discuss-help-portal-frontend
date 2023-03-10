
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import ArticleList from './ArticleList';
const SearchArticle = () => {
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchArticles = (searchQuery) => {
        setLoading(true);
        fetch(`/articles/search/${searchQuery}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.error) {
                    throw response.error;
                } else {
                    setLoading(false);
                    setArticles(response.searchResults);
                }
            }).catch(error => {
                setLoading(false);
                console.log("error : ", error);
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchArticles(query);
    };

    const handleArticleClick = (articleName) => {
        navigate(`/article/${articleName}`);
    };

    return (
        <Container>
            {/* <Row className="my-5">
                <Col sm={12}>
                    <h1 className="text-center">Search Articles</h1>
                </Col>
                <Col sm={12}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Enter search query"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSubmit}>
                            Search
                        </Button>
                    </Form>
                </Col>
            </Row> */}
            <Row className="my-5">
                <Col sm={12}>
                    <h1 className="text-center">Search Articles</h1>
                </Col>
                <Col sm={12}>
                    <Form onSubmit={handleSubmit}>
                        <Row className="align-items-center">
                            <Col xs={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter search query"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </Col>
                            <Col xs={2}>
                                <Button variant="primary" onClick={handleSubmit}>
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>


            <Row>


                <Col sm={12}>
                    {loading ? (
                        <Spinner animation="border" role="status" className="d-flex justify-content-center my-5">
                            <span className="sr-only"></span>
                        </Spinner>
                    ) : (
                        <ArticleList label={"search results : "} articles={articles} />
                    )}
                </Col>

            </Row>
        </Container>
    );
};

export default SearchArticle;
