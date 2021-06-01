import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button } from 'react-bootstrap';


class AddBook extends React.Component {
    render() {
        return (
            <Modal show={this.props.showModalBool} onHide={this.props.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.props.addBook}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Book Name" name = 'name' onChange={this.props.handleName}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" name = 'description'onChange={this.props.handleDescription}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Image Url</Form.Label>
                            <Form.Control type="text" placeholder="Valid URL" name = 'img' onChange={this.props.handleImage}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Add Book
                                    </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.hideModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddBook;

