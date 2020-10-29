import React from 'react';
import {Link} from 'react-router-dom'

const ArtworkGrid = ({ artworks }) => {
  return (
    <div className="art-grid">
      { artworks ?
        artworks.length > 0 ?
          artworks.map(artwork => {
            return (
              <div className="tile" id={ artwork.id } key= { artwork.id }>
                {/* TBU: Will add rotating images */}
                <Link to={`/artworks/${artwork.id}`} >
                  <img src={artwork.shopImages[0].imageURL } />  
                </Link>
                
                <div className="art-description">
                  <p className="artwork-title">{ artwork.title }</p>
                  <p>{ artwork.artist.name }</p>
                  <p>${ artwork.price }</p>
                </div>
              </div>
            )
          })
        : <h2>Sorry, no artwork meets this criteria.</h2>
        : <h2>Sorry, no artwork found.</h2>
      }
    </div>
  )
}

export default ArtworkGrid;
