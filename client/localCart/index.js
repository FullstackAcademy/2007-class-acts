export let localCart = []

if(localStorage.graceShopper) localCart = JSON.parse(localStorage.graceShopper)

export const addLocalCartItem = (cartItem) => {
  const existingArtwork = localCart.find(item => item.artworkId === cartItem.artworkId)
  if(existingArtwork) {
    //update the quantity
    cartItem.quantity += existingArtwork.quantity
    localCart = localCart.filter(item => item.artworkId !== cartItem.artworkId)
  }
  localCart.push(cartItem)
  localStorage.setItem('graceShopper', JSON.stringify(localCart))
  return(cartItem)
}

export const clearLocalCart = () => {
  localCart = []
  localStorage.setItem('graceShopper', JSON.stringify(localCart))
}
