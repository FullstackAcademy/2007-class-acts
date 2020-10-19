import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArtworks } from '../redux/artworks';

export class AllArtwork extends Component {
  componentDidMount() {
    this.props.getArtworks();
  }

  render() {
    return(
      <div>
        <div className="art-filters">
          <select name="artist" id="artist">
            { this.props.artworks ?
              this.props.artworks.map(artwork => {
                return (
                  <option value={ artwork.artist.name }>{ artwork.artist.name }</option>
                )
              }) :
              <option value="N/A">---</option>
            }
          </select>
          <select name="genre" id="genre">
            { this.props.artworks ?
              this.props.artworks.map(artwork => {
                return (
                  <option value={ artwork.genre.name }>{ artwork.genre.name }</option>
                )
              }) :
              <option value="N/A">---</option>
            }
          </select>
        </div>
        <div className="art-grid">
          { this.props.artworks ?
            this.props.artworks.map(artwork => {
              // functionality dependent on GET /api/artworks route including artist, shopImage, etc.
              return (
                <div className="tile" id={ artwork.id }>
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
    artworks: state.artworks
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getArtworks: () => dispatch(getArtworks()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllArtwork);
