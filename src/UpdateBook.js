import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button } from 'react-bootstrap';
import 'react-notifications/lib/notifications.css';
// props {
//     showUpdateModal,
//     hideModal(),
//     submitter : Update,
//     handler for name,description and url 
// }


class UpdateBook extends React.Component {
    render() {
        return (<>
            <Modal show={this.props.showUpdateModalBool} onHide={this.props.hideUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.props.updateBook}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control type="text" placeholder= {this.props.oldName} name = 'name' 
                            value={this.props.oldName}
                            onChange={(e)=> this.props.handleName(e)}
                            />
                            <Form.Text className="text-muted">
                                New Book Name
                                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" name = 'description'
                            value={this.props.oldDescription}
                            onChange ={(e) => this.props.handleDescription(e)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Image Url</Form.Label>
                            <Form.Control type="text" placeholder="Valid URL" name = 'img' 
                            value={this.props.oldUrl}
                            onChange ={(e) => this.props.handleImage(e)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Update
                                    </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.hideUpdateModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
}

export default UpdateBook;

