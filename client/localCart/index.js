export let localCart = []

if (localStorage.graceShopper) localCart = JSON.parse(localStorage.graceShopper)

export const addLocalCartItem = (cartItem) => {
  const existingArtwork = localCart.find(
    (item) => item.artworkId === cartItem.artworkId
  )
  if (existingArtwork) {
    //update the quantity
    cartItem.quantity += existingArtwork.quantity
    localCart = localCart.filter(
      (item) => item.artworkId !== cartItem.artworkId
    )
  }
  localCart.push(cartItem)
  localStorage.setItem('graceShopper', JSON.stringify(localCart))
  return cartItem
}

export const changeLocalCartItem = (cartItem) => {
  const existingArtwork = localCart.find(
    (item) => item.artworkId === cartItem.artworkId
  )
  if (existingArtwork) {
    //remove the old item from the localCart
    localCart = localCart.filter(
      (item) => item.artworkId !== cartItem.artworkId
    )
  }
  //put the new one in
  localCart.push(cartItem)
  localStorage.setItem('graceShopper', JSON.stringify(localCart))
  return cartItem
}

export const removeLocalCartItem = (cartItem) => {
  const existingArtwork = localCart.find(
    (item) => item.artworkId === cartItem.artworkId
  )
  if (existingArtwork) {
    //remove the old item from the localCart
    localCart = localCart.filter(
      (item) => item.artworkId !== cartItem.artworkId
    )
  }
  //don't put nuthin in
  localStorage.setItem('graceShopper', JSON.stringify(localCart))
  //return 204 to match the DB output
  return 204
}

export const clearLocalCart = () => {
  localCart = []
  localStorage.setItem('graceShopper', JSON.stringify(localCart))
}
