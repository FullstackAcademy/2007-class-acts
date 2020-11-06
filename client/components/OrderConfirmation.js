import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import OrderCard from './OrderCard'
import { clearLocalCart } from '../localCart'
import { clearCart } from '../redux/cart'

class OrderConfirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: {},
      error: '',
    }
  }
  async componentDidMount() {
    const sessionId = this.props.history.location.search.split('=')[1]
    if (sessionId) {
      const session = await axios.get(`/api/checkout/session/${sessionId}`)
      if (session.data.payment_status === 'paid') {
        const order = await axios.get(`/api/orders/stripeRefId/${sessionId}`)
        this.setState({ order: order.data })
        /*NOTE: if for some reason, someone returns to the order confirmation page after
        they have added more items to their cart, this will clear what was in their cart before.
        seems like an edge case so i didnt account for that here.
        */
        clearLocalCart()
        this.props.clearCart()
      }
    } else {
      this.setState({
        error: 'Something went wrong with your order. Try again later.',
      })
    }
  }

  render() {
    return (
      <div>
        <h1>Thanks for your order. We appreciate your business!</h1>
        {Object.keys(this.state.order).length ? (
          <div>
            <h2>Order Details</h2>
            <OrderCard order={this.state.order} />
          </div>
        ) : this.state.error ? (
          <h2>{this.state.error}</h2>
        ) : (
          <h2>Loading order details...</h2>
        )}
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    clearCart: () => dispatch(clearCart),
  }
}

export default connect(null, mapDispatch)(OrderConfirmation)
