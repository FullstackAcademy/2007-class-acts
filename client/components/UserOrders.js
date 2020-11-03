// LIBRARIES
import React from 'react';
import { connect } from 'react-redux';

// FILES
import { getArtworks } from '../redux/artworks';
import OrderDetails from './OrderDetails'

class UserOrders extends React.Component {
  componentDidMount() {
    this.props.getArtworks();
  }

  render () {
    const { user } = this.props;
    return (
      <div className="order-history-section">
        <h3>Past Orders</h3>
        <div className="order-list">
          { user.orders ?
            user.orders.length > 0 ?
              user.orders.map(order => {
                return <OrderDetails order={order} key={order.id} />
              }) :
            <p>No past orders. Begin your first order!</p> :
            <p>No past orders. Begin your first order!</p>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
   }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtworks: () => dispatch(getArtworks())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);
