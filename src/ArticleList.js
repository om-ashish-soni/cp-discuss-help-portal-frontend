import React from 'react'

import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function ArticleList({ label,articles }) {
    const navigate=useNavigate();

    const handleArticleClick = (articleName) => {
        navigate(`/article/${articleName}`);
    };
    return (
        <div>
            
            <Card.Title>{label}</Card.Title>
            {
                articles.map((article) => (
                    <Card key={article.id} className="my-5 mx-auto" style={{ maxWidth: "30rem" }}>
                        <Card.Body>
                            <Card.Title className="text-primary" onClick={() => handleArticleClick(article.name)} style={{ cursor: 'pointer' }}>
                                {article.name}
                            </Card.Title>
                            <Card.Text className="text-secondary">
                                {article.summary}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }

        </div>
    )
}
