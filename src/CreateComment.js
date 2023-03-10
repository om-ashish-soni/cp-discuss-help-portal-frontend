import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function CreateComment({ parentId, onSubmit }) {
    const [content, setContent] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        onSubmit({ parentId, content });
        setContent('');
    };

    return (
        // <div className="ml-4 mb-4">
        //   <Form onSubmit={handleSubmit}>
        //     <Form.Group controlId="formComment">
        //       <Form.Label>Add a Comment:</Form.Label>
        //       <Form.Control
        //         as="textarea"
        //         rows={3}
        //         value={content}
        //         onChange={(e) => setContent(e.target.value)}
        //       />
        //     </Form.Group>
        //     <Button variant="primary" type="submit">
        //       Submit
        //     </Button>
        //   </Form>
        <>
            
            <Card>
                <Card.Body>
                    <Form onSubmit={handleCommentSubmit}>
                        <Form.Group controlId="formComment">
                            <Form.Label>Add a Comment:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="content"
                                placeholder="Type your comment here..."
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}

export default CreateComment;
