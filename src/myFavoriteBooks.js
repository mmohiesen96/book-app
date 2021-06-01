import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './myFavoriteBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import AddBook from './AddBook';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal:false,
      bookName:'',
      description:'',
      imageUrl:''
    }

    console.log(this.state.books);
  }


  handleModal = ()=> {
    this.setState( {
      showModal:true
    })    
  }

  closeModal = ()=> {
    this.setState( {
      showModal:false
    })    
  }
  componentDidMount = async () => {
    const books = await axios.get('http://localhost:3001/books', { params: { email: this.props.auth0.user.email } })
    console.log('books', books.data)
    this.setState({
      books: books.data
    });

    console.log(this.state.books);
  }


  setName = (e) => {
    this.setState({
      bookName:e.target.value
    })
  }

  setDescription = (e) => {
    this.setState({
      description:e.target.value
    })
  }
  setImage = (e) => {
    this.setState({
      imageUrl:e.target.value
    })
  }

  addBook = async(e) => {
    e.preventDefault();
    
    const bookData = {
      name : this.state.bookName,
      description : this.state.description,
      image_url : this.state.imageUrl,
      email : this.props.auth0.user.email,
    }
    let newBooks = await axios.post('http://localhost:3001/addBook', bookData);

    this.setState({
      books:newBooks.data,
      showModal:false
    })
  }

  deleteBook = async(index) => {
    const userEmail = {
      email:this.props.auth0.user.email
    }
    let newBooks = await axios.delete(`http://localhost:3001/deleteBook/${index}`,{params:userEmail})

    this.setState({
      books:newBooks.data
    })
  }
  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleModal}>Add Book</Button>
        {this.state.showModal && <AddBook hideModal={this.closeModal} showModalBool ={this.state.showModal} handleName={this.setName}
          handleDescription={this.setDescription}
          handleImage={this.setImage}
          addBook = {this.addBook}
        ></AddBook> }
        <Jumbotron>
          <h1>Book Collection</h1>
          <p>
            This is a collection of my favorite books
        </p>
        </Jumbotron>

        {
          this.state.books.map((item,idx) => {
            return (
              <Card style={{ width: '18rem' }} key={idx}>
                <Card.Img variant="top" src={item.image_url} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                  <Button variant="primary" onClick={() => this.deleteBook(idx)}>Delete</Button>
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