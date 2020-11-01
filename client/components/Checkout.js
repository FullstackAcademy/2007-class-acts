import React from 'react';

const Checkout = ({ cart, artworks }) => {
  // calculate subtotal of cart
  let subtotal = 0;
  cart.map(cartItem => {
    const cartItemArtwork = artworks.find(art => art.id === cartItem.artworkId);
    subtotal += (cartItemArtwork.price * cartItem.quantity);
  });

  return (
    <div className="checkout">
      <div className="receipt">
        <div className="line-item">
          <p>Products total</p>
          <p>${ subtotal.toFixed(2) }</p>
        </div>
        <div className="line-item">
          <p>Tax</p>
          <p>${ (subtotal * 0.08).toFixed(2) }</p>
        </div>
        <div className="line-item">
          <p>Checkout total</p>
          <p>${ (subtotal * 1.08).toFixed(2) }</p>
        </div>
      </div>
      <button id="checkout-btn" type="button">CHECKOUT</button>
    </div>
  )
}

export default Checkout;
