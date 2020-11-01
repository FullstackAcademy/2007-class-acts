import React from 'react';
import dayjs from 'dayjs';

const UserOrders = ({ user }) => {
  return (
    <div className="order-history-section">
      <h3>Past Orders</h3>
      <div className="order-list">
        { user.orders ?
          user.orders.length > 0 ?
            user.orders.map(order => {
              // calculate total price of each order
              const orderTotal = order.orderItems
                .map(item => item.orderedPrice * item.orderedQuantity)
                .reduce((total, order) => total + order)
              return (
                <div className="order-info" key={ order.id }>
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
              )
            }) :
          <p>No past orders. Begin your first order!</p> :
          <p>No past orders. Begin your first order!</p>
        }
      </div>
    </div>
  )
}

export default UserOrders;
