import React from 'react'
import { connect } from 'react-redux'
import { getArtwork } from '../redux/artwork'
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/cart'

export class SingleArtwork extends React.Component {
  constructor() {
    super()
    this.addQty = this.addQty.bind(this)
  }

  addQty() {
    const quantity = +document.getElementById('qty').value
    const artworkId = this.props.artwork.id
    const cartItem = { artworkId, quantity }
    //add qty to DB if logged in
    let isLoggedIn = false
    if (this.props.user.id) isLoggedIn = true
    this.props.addCartItem(cartItem, isLoggedIn)
  }

  componentDidMount() {
    this.props.getArtwork(this.props.match.params.id)
  }

  render() {
    const quantitySelection = []
    for (let i = 1; i <= this.props.artwork.quantity; i++) {
      quantitySelection.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    const { isAdmin, artwork } = this.props
    return (
      <div>
        {this.props.artwork.shopImages ? (
          <div className="singleArtwork">
            <div className="singleArtImageContainer">
              <img
                className="singleArtImage"
                src={
                  this.props.artwork.shopImages.length
                    ? this.props.artwork.shopImages[0].imageURL
                    : '/img/default.jpg'
                }
              />
              <div className="underArt">
                <Link to="/">Back</Link>
                {quantitySelection.length !== 0 ? (
                  <span>
                    Quantity
                    <select id="qty">{quantitySelection}</select>
                    <button type="button" onClick={this.addQty}>Add To Cart</button>
                  </span>
                ) : (
                  <span className="noQty">Artwork out of stock</span>
                )}
              </div>
            </div>
            <div className="singleArtInfo">
              {!!isAdmin && (
                <Link to={`/admin/artworks/edit/${artwork.id}`}>Edit</Link>
              )}
              <h2>{this.props.artwork.title}</h2>
              <p>{`By ${
                this.props.artwork.artist
                  ? this.props.artwork.artist.name
                  : 'Unknown'
              }`}</p>
              <p>{`$${this.props.artwork.price.toFixed(2)}`}</p>
              <hr />
              <h2>Art Description</h2>
              <p>{this.props.artwork.description}</p>
              <hr />
              <h2>Artist Bio</h2>
              <p>
                {this.props.artwork.artist
                  ? this.props.artwork.artist.bio
                  : 'Nothing is known about this artist'}
              </p>
            </div>
          </div>
        ) : (
          <h2>No image found</h2>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isAdmin } = state.user
  return {
    artwork: state.artwork,
    user: state.user,
    isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtwork: (id) => dispatch(getArtwork(id)),
    addCartItem: (cartItem, isLoggedIn) => dispatch(addCartItem(cartItem, isLoggedIn)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleArtwork)
