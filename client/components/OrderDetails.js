import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import { getArtworks } from '../redux/artworks';

class OrderDetails extends React.Component {
  componentDidMount() {
    this.props.getArtworks();
  }
  render(){
    const order = this.props.location.state
    const { artworks } = this.props;
    if(!order) return <Redirect to="/" />
    return (
      <div>
        <h2>Order Details</h2>
        <h4><Link to="/admin/orders">Back</Link></h4>
        <table className="gs-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Status</th>
                <th>Address</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.id}</td>
                <td>{dayjs(order.date).format('MMM D, YYYY h:mm A')}</td>
                <td>{order.status}</td>
                <td>{order.address}</td>
                <td>{order.user.email}</td>
              </tr>
            </tbody>
          </table>
          <h4>Ordered Items</h4>
          <table className="gs-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Artist</th>
                <th>Title</th>
                <th>Ordered Quantity</th>
                <th>Ordered Price</th>
              </tr>
            </thead>
            <tbody>
              {
                artworks.length > 0 ?
                  order.orderItems.map(oi => {
                    oi.artwork = artworks.filter(art=>art.id===oi.artworkId)[0]
                    return (
                      <tr key={oi.id}>
                        <td><img className="order-item-img" src={oi.artwork.shopImages[0].imageURL} />
                        </td>
                        <td>{oi.artwork.artist.name}</td>
                        <td>{oi.artwork.title}</td>
                        <td>{oi.orderedQuantity}</td>
                        <td>${oi.orderedPrice.toFixed(2)}</td>
                      </tr>
                    )
                  }) : null
              }
            </tbody>
          </table>
          <h3>Order Total: ${order.orderItems.reduce((acc,oi) => {
            acc+= oi.orderedPrice*oi.orderedQuantity
            return acc
            },0).toFixed(2)}</h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    artworks: state.artworks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtworks: () => dispatch(getArtworks())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
