import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = null;
    for(let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1]
      } else {
        ingredients[param[0]] = +param[1]
      }
    }

    this.setState({ingredients, price})
  }

  checkoutCancelledHandler = () => {
    return;
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render () {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;

      summary =  (
      <>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinueHandler} />

        <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        {/* <Route
            path={this.props.match.path + '/contact-data'}
            render={(props) => (<ContactData ingredients={this.props.ingredients} price={this.props.price} {...props}/>)} /> */}
      </>);
    }
    return (
      <div>
        {summary}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  }
};

export default connect(mapStateToProps)(Checkout);