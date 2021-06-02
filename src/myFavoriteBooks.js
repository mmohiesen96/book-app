import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './myFavoriteBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import AddBook from './AddBook';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import UpdateBook from './UpdateBook';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      bookName: '',
      description: '',
      imageUrl: '',
      showUpdateModal:false,
      index : 0
    }

    console.log(this.state.books);
  }


  handleModal = () => {
    this.setState({
      showModal: true
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false
    })
  }
  componentDidMount = async () => {
    const books = await axios.get(`${process.env.REACT_APP_HEROKU}/books`, { params: { email: this.props.auth0.user.email } })
    console.log('books', books.data)
    this.setState({
      books: books.data
    });

    console.log(this.state.books);
  }


  setName = (e) => {
    this.setState({
      bookName: e.target.value
    })
  }

  setDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }
  setImage = (e) => {
    this.setState({
      imageUrl: e.target.value
    })
  }

  addBook = async (e) => {
    e.preventDefault();

    const bookData = {
      name: this.state.bookName,
      description: this.state.description,
      image_url: this.state.imageUrl,
      email: this.props.auth0.user.email,
    }
    let newBooks = await axios.post(  `${process.env.REACT_APP_HEROKU}/addBook`, bookData);
    this.setState({
      books: newBooks.data,
      showModal: false
    })
    NotificationManager.success('Book Name : ' + this.state.bookName, 'Added to ' + this.props.auth0.user.email);
  }

  deleteBook = async (index) => {
    const userEmail = {
      email: this.props.auth0.user.email
    }
    let newBooks = await axios.delete(`${process.env.REACT_APP_HEROKU}/deleteBook/${index}`, { params: userEmail })

    this.setState({
      books: newBooks.data
    })
  }
  
  hideUpdateModal = () => {
    this.setState({
      showUpdateModal: false
    })
  }

  showUpdateModal = (indx) => {
    const foundItem = this.state.books.filter((val,idx) => {
      return indx === idx;
    })
    console.log(foundItem);
    this.setState({
      showUpdateModal: true,
      index : indx,
      bookName : foundItem[0].name,
      description:foundItem[0].description,
      imageUrl:foundItem[0].image_url

    })
  }

  updateBook = async(e) => {
    e.preventDefault();
    const bookData = {
      name : this.state.bookName,
      description : this.state.description,
      image_url : this.state.imageUrl,
      email : this.props.auth0.user.email
    }

    let newBooksData = await axios.put(`${process.env.REACT_APP_HEROKU}/updateBook/${this.state.index}`, bookData);
    NotificationManager.info('Successful', 'Book : ' + this.state.bookName + ' Edited');
    this.setState({
      books:newBooksData.data,
      showUpdateModal:false
    })

  }




  render() {
    return (
      <>
        <NotificationContainer></NotificationContainer>

        {this.state.showModal && <AddBook hideModal={this.closeModal} showModalBool={this.state.showModal} handleName={this.setName}
          handleDescription={this.setDescription}
          handleImage={this.setImage}
          addBook={this.addBook}
        ></AddBook>}
        {
          this.state.showUpdateModal&&
          <UpdateBook
          hideUpdateModal ={this.hideUpdateModal}
          showUpdateModalBool = {this.state.showUpdateModal}
          oldName = {this.state.bookName}
          oldDescription ={this.state.description}
          oldUrl ={this.state.imageUrl}
          handleName={this.setName}
          handleDescription={this.setDescription}
          handleImage={this.setImage}
          updateBook={this.updateBook}
          ></UpdateBook>
        }
        <Jumbotron>
          <h1>Book Collection</h1>
          <p>
            This is a collection of my favorite books
        </p>
        </Jumbotron>
        <Button variant="primary" onClick={this.handleModal}>Add Book</Button>
        {
          this.state.books.map((item, idx) => {
            return (
              <Card style={{ width: '18rem' }} key={idx}>
                <Card.Img variant="top" src={item.image_url} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                  <Button variant="secondary" onClick={() => this.deleteBook(idx)}>Delete</Button>
                  <Button variant="danger" onClick={() => this.showUpdateModal(idx)}>Update</Button>
                </Card.Body>
              </Card>
            )
          })
        }
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);