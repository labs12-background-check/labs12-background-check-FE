import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
// import PrivateRoute from './Authentication';
import UserForm from './components/users/userForm';
import Candidates from './components/candidates/candidateForm';
import CandidateList from './components/candidates/candidateList';
import Login from './Login';
import Register from './Register';
import { GoogleLogin } from 'react-google-login';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
const keys = require('./keys');



const Homepage = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      user: null,
      token: ''
    };
  }

  logout = () => {
    this.setState({
      isAuthenticated: false,
      token: '',
      user: null
    })
  };

  googleResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({
      access_token: response.accessToken
    }, null, 2)], {type : 'application/json'});
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch('http://localhost:4000/api/v1/auth/google', options).then(
      r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => {
          if (token) {
            this.setState({isAuthenticated: true, user, token})
          }
        });
      }
    )
  };

  onFailure = (error) => {
    alert(error);
  };
  
  render() {

    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <button onClick={this.logout} className="button">
              Log Out
            </button>
          </div>
        </div>
      ) :
      (
        <div>
          <GoogleLogin 
            client_id = {keys.google.clientID}
            buttonText = "Login"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
          />
        </div>
      );

    return (
      <Router>
           <StripeProvider apiKey="pk_test_hJ4ymeWUIsyUjYOAiTXmMMUG00HWO2eMEX">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
        <div className="App">
          <Homepage>
            <Link to ='/login'>Login</Link>
            <Link to ='/register'>Register</Link>
            <Link to ='/users'>Users</Link>
            <Link to ='/candidates'>Candidates</Link>
            <Link to ='/candidateList'>Submit Request</Link>
          </Homepage>
          {content}
          
            
            <Route exact path= '/login' component={Login} />
            <Route path= '/register' component={Register} />
            <Route exact path='/users' component={UserForm} />
            <Route exact path='/candidates' component={Candidates} />
            <Route exact path='/candidateList' component={CandidateList} />
            
        </div>
      </Router>
    );
  }
}

export default App;