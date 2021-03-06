import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {withRouter} from 'react-router';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

 async submit(ev) {
    // User clicked submit
    let {token} = await this.props.stripe.createToken({name: "Name"});
  let response = await fetch(`${process.env.REACT_APP_BE_URL}/charge`, {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    body: token.id
  });

  if (response.ok) 
  {
    console.log("Purchase Complete!");
    this.props.history.push("/charge");
  }
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default withRouter(injectStripe(CheckoutForm));