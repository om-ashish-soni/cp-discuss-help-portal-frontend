import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import ArticleList from './ArticleList';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const { profileName } = useParams();
    const fetchArticles = () => {
        setLoading(true);
        fetch(`/articles/get/creator/${profileName}`, {
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
                    setArticles(response.articles);
                }
            }).catch(error => {
                setLoading(false);
                console.log("error : ", error);
            })
    };
    useEffect(() => {
        console.log("profileName : ", profileName);
        fetchArticles();
    }, [])

    return (
        <Container>
            {loading ? (
                <Spinner animation="border" role="status" className="d-flex justify-content-center my-5">
                    <span className="sr-only"></span>
                </Spinner>
            ) : (
                <ArticleList label={" articles by  : "+profileName} articles={articles} />
            )}

        </Container>
    )
}
