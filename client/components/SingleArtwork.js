import React from  'react';
import { connect } from 'react-redux';
import { getArtwork } from '../redux/artwork';
import {Link} from 'react-router-dom'
import { addToCart } from '../redux/cart'


export class SingleArtwork extends React.Component {
    constructor() {
        super()
        this.addQty = this.addQty.bind(this)
    }

    async addQty(){
        const quantity = document.getElementById('qty').value
        const artworkId = this.props.artwork.id
        const cartItem = { artworkId, quantity }
        await this.props.addToCart(cartItem)
        localStorage.setItem('graceCart', JSON.stringify(this.props.cart))
    }

    async componentDidMount(){
        await this.props.getArtwork(this.props.match.params.id)
    }

    render(){
        const quantitySelection = []
        for (let i = 1; i <= this.props.artwork.quantity; i++) {
            quantitySelection.push(<option key={i} value={i}>{i}</option>)
        }
        return (
        <div>
            {(this.props.artwork.shopImages)
                ?
            <div className="singleArtwork">
                <div className="singleArtImageContainer">
                    <img className="singleArtImage" src = {this.props.artwork.shopImages[0].imageURL} />
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
                <div style={{padding: "1rem"}}>
                    <h2>{this.props.artwork.title}</h2>
                    <p>{`By ${this.props.artwork.artist.name}`}</p>
                    <p>{`$${this.props.artwork.price.toFixed(2)}`}</p>
                    <hr />
                    <h2>Art Description</h2>
                    <p>{this.props.artwork.description}</p>
                    <hr />
                    <h2>Artist Bio</h2>
                    <p>{this.props.artwork.artist.bio}</p>
                </div>
            </div>
            :
            <h2>No image found</h2>}
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        artwork: state.artwork,
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArtwork: (id) => dispatch(getArtwork(id)),
        addToCart: (cartItem) => dispatch(addToCart(cartItem))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleArtwork);
