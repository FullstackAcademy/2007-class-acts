import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import dayjs from 'dayjs'

const OrderDetails = ({order, artworks}) => {
  // calculate total price of each order
  const orderTotal = order.orderItems
    .map(item => item.orderedPrice * item.orderedQuantity)
    .reduce((total, order) => total + order, 0)

  // get artworks in order
  const orderItemArt = order.orderItems.map(oi => oi.artworkId);

  return (
    <div className="order-info">
      <div className="order-details">
        <div className="order-subinfo">
          <h4>ORDER PLACED</h4>
          <p>{ dayjs(order.date).format('MMM D, YYYY h:mm A') }</p>
        </div>
        <div className="order-subinfo">
          <h4>STATUS</h4>
          <p>{ order.status }</p>
        </div>
        <div className="order-subinfo">
          <h4>DELIVER TO</h4>
          <p>{ order.address }</p>
        </div>
        <div className="order-subinfo">
          <h4>ORDER TOTAL</h4>
          <p>${ orderTotal.toFixed(2) }</p>
        </div>
        <div className="order-subinfo">
          <h4>ORDER #</h4>
          <p>{ order.id }</p>
        </div>
      </div>
      <h4>ORDER ITEMS</h4>
      <div className="order-art">
        {artworks
          .filter(art => orderItemArt.includes(art.id))
          .sort((a, b) => a.date - b.date)
          .map(oi => {
            const artLink = `/artworks/${oi.id}`;
            return (
              <div key={oi.id}>
                <Link to={artLink}><img className="order-item-img" src={oi.shopImages[0].imageURL} /></Link>
              </div>
            )
          })
        }
    </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    artworks: state.artworks
  }
}

export default connect(mapState)(OrderDetails)
