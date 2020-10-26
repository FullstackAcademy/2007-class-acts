let cart = []
if(localStorage.graceShopper) cart = JSON.parse(localStorage.graceShopper)

export const addLocalCartItem = (cartItem) => {
  const existingArtwork = cart.find(item => item.artworkId === cartItem.artworkId)
  if(existingArtwork) {
    //update the quantity
    cartItem.quantity += existingArtwork.quantity
    cart = cart.filter(item => item.artworkId !== cartItem.artworkId)
  }
  cart.push(cartItem)
  localStorage.setItem('graceShopper', JSON.stringify(cart))
  return(cartItem)
}

export const localCart = () => cart

export const clearLocalCart = () => {
  cart = []
  localStorage.setItem('graceShopper', JSON.stringify(cart))
}
