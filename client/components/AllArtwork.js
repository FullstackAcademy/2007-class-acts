// LIBRARIES
import React, { Component } from 'react';
import { connect } from 'react-redux';

// FILES
import { getArtworks } from '../redux/artworks';
import { getArtists } from '../redux/artists';
import { getGenres } from '../redux/genres';

export class AllArtwork extends Component {
  componentDidMount() {
    this.props.getArtworks();
    this.props.getArtists();
    this.props.getGenres();
  }

  render() {
    return(
      <div>
        <div className="art-filters">
          <select name="artist" id="artist">
            { this.props.artists ?
              this.props.artists.map(artist => {
                return (
                  // TBU: Add in the number of artworks that match criteria in ()
                  // Will need express route for /api/artists/:id/artworks or something
                  <option value={ artist.id } key={ artist.id }>{ artist.name }</option>
                )
              }) :
              <option value="N/A">---</option>
            }
          </select>
          <select name="genre" id="genre">
            { this.props.genres ?
              this.props.genres.map(genre => {
                return (
                  <option value={ genre.id } key={ genre.id }>{ genre.name }</option>
                )
              }) :
              <option value="N/A">---</option>
            }
          </select>
          {/* TBU: Add in another drop-down for Medium */}
        </div>
        <div className="art-grid">
          { this.props.artworks ?
            this.props.artworks.map(artwork => {
              // functionality dependent on GET /api/artworks route including artist, shopImage, etc.
              return (
                <div className="tile" id={ artwork.id }>
                  {/* TBU: Will add rotating images */}
                  <img src={ artwork.shopImage.imageURL } />
                  <div className="art-description">
                    <p>{ artwork.title }</p>
                    <p>{ artwork.artist.name }</p>
                    <p>{ artwork.price }</p>
                  </div>
                </div>
              )
            }) : <h2>Sorry, no artwork found.</h2>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    artworks: state.artworks,
    artists: state.artists,
    genres: state.genres
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getArtworks: () => dispatch(getArtworks()),
    getArtists: () => dispatch(getArtists()),
    getGenres: () => dispatch(getGenres()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllArtwork);
