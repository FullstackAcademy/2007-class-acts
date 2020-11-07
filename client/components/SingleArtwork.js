/* eslint-disable complexity */
import axios from 'axios'
import React from  'react';
import { connect } from 'react-redux';
import { getArtwork } from '../redux/artwork';
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/cart'
import { Review } from './Review'

export class SingleArtwork extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
      loading: true,
      imageIx: 0
    }
    this.addQty = this.addQty.bind(this)
    this.changeImg = this.changeImg.bind(this)
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

  changeImg(inc) {
    const { imageIx } = this.state
    const maxLength = this.props.artwork.shopImages.length - 1
    const newIx = Math.max(Math.min(imageIx + inc,maxLength),0)
    this.setState({...this.state, imageIx: newIx})
  }

  async componentDidMount(){
    await this.props.getArtwork(this.props.match.params.id)
    this.getReviews(this.props.match.params.id);
    this.setState({...this.state, loading: false})
  }

  async getReviews(artworkId){
      try {
          const reviews = (await axios.get(`/api/reviews/${artworkId}`)).data
          this.setState({...this.state, reviews})
      } catch(err) {
          console.log(err)
      }
  }

  render(){
    if(!this.state.loading && !this.props.artwork.id) return (<h4 className="noQty">This ain't no artwork. This ain't no disco.</h4>)
    if(this.state.loading) return (<h5>Loading</h5>)
    const quantitySelection = []
    const { reviews, imageIx } = this.state
    for (let i = 1; i <= this.props.artwork.quantity; i++) {
        quantitySelection.push(<option key={i} value={i}>{i}</option>)
    }
    const { isAdmin, artwork } = this.props
    return (
      <div>
        <div>
          <div className="singleArtwork">
            <div className="singleArtImageContainer">
              {(artwork.shopImages && artwork.shopImages.length) ?
                <img className="singleArtImage" src = {artwork.shopImages[imageIx].imageURL}/>
                : <img className="singleArtImage" src='/img/default.jpg'/>}
              {(artwork.shopImages && artwork.shopImages.length > 1) ?
                <div className="imgArrow">
                  <span onClick={()=>this.changeImg(-1)}>&#8249;</span>
                  <span onClick={()=>this.changeImg(1)}>&#8250;</span>
                </div>
              :null}
                <div className="underArt">
                    <Link to="/">Back</Link>
                    { quantitySelection.length !== 0 ?
                        <span>
                            Quantity
                            <select id="qty">
                                {quantitySelection}
                            </select>
                            <button onClick={this.addQty}>Add To Cart</button>
                        </span>
                        : <span className="noQty">Artwork out of stock</span>
                    }
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
          <div className="reviews">
              <h2>Reviews</h2>
              { reviews.length > 0
                  ?
                  <div className="reviewContainer">
                      { reviews.map(review => <Review key={review.id} review={review}/>)}
                  </div>
                  :
                  <div>
                      <h5>There are no reviews for this artwork yet! Maybe you should buy it...</h5>
                  </div>
              }
          </div>
        </div>
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
