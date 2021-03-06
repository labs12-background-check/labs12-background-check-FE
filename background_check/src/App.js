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

import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';



const Homepage = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

class App extends React.Component {
  
  render() {

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