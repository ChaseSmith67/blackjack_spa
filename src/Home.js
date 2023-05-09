import React from 'react'
import { Container, Button } from 'react-bootstrap'
import App from './App'

function Home() {
  return (
    
    <Container fluid className="p-5 mb-4 bg-dark rounded-3">
      <div className="p-2 mb-5 bg-info rounded-3">
      <h1 className='header'>
        Blackjack Trainer
        </h1>
      </div>
      <div className="d-flex mb-3 justify-content-center">
      <Button variant="primary" size="lg">
        Play Blackjack
      </Button>
      </div>
      <div className="d-flex mb-3 justify-content-center">
      <Button variant="primary" size="lg">
        How to Play
      </Button>
      </div>
      <div className="d-flex mb-3 justify-content-center">
      <Button variant="primary" size="lg">
        Statistics
      </Button>
      </div>
      <div className="d-flex mb-3 justify-content-center">
      <Button variant="primary" size="lg">
        Settings  
      </Button>
      </div>
      

    </Container>
  )
}

export default Home