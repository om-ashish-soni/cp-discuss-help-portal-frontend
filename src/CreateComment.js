import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function CreateComment({ articleName, onSubmit }) {
    const [content, setContent] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        console.log("in handle submit of create comment",articleName,content);
        onSubmit(articleName, content);
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
                    {/* <Form > */}
                        <Form.Group controlId="formComment">
                            <Form.Label>Add a Comment:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="content"
                                placeholder="Type your comment here..."
                                onChange={(e)=>setContent(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={(e)=>handleCommentSubmit(e)}>
                            Submit
                        </Button>
                    {/* </Form> */}
                </Card.Body>
            </Card>
        </>
    );
}

export default CreateComment;
