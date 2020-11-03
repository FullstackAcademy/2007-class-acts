import React from  'react';

export const Review = ({ review }) => {

  const stars = (len) => {
    const starArray = []
    for(let i = 0; i < len; i++) starArray.push(<img key={i} src='/img/star.png'/>)
    return starArray
  }

  return (
<div className="review">
  <p>
    {stars(review.rating)}
  </p>
  <p>{review.text}</p>
</div>
  )
}
