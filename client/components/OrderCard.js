import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { getArtworks } from '../redux/artworks'

class OrderCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: []
    }
  }
    //get user's reviews so that user can not re-review
  async componentDidUpdate() {
    if(this.props.user.id && !this.state.reviews) {
      const reviews = (await axios.get(`/api/reviews/user/${this.props.user.id}`)).data
      this.setState({ reviews})
    }
  }

  render() {
    const { order, artworks, getArt } = this.props
    const { reviews } = this.state
    if (!artworks.length) {
      getArt()
    }
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
                  <div>
                    <Link to={artLink}><img className="order-item-img" src={oi.shopImages[0].imageURL} /></Link>
                    <p>Quantity: {order.orderItems.find(item => item.artworkId === oi.id).orderedQuantity}</p>
                    <p>Price: {order.orderItems.find(item => item.artworkId === oi.id).orderedPrice.toFixed(2)}</p>
                      <span className='rev'>
                      {/* this below is to remove review link if you've already reviewed */}
                      { reviews ?
                          reviews.map(r=>r.artworkId).includes(oi.id) ?
                          null :
                          <Link to={`/review/${oi.id}`}>Leave a review.</Link>
                          :
                        null
                      }
                    </span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    artworks: state.artworks,
    reviews: state.reviews,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    getArt: () => dispatch(getArtworks())
  }
}

export default connect(mapState, mapDispatch)(OrderCard)
