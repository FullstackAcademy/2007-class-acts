// LIBRARIES
import React, { Component } from 'react';
import { connect } from 'react-redux';

// FILES
import { getArtworks, filterArtworks } from '../redux/artworks';
import { getArtists } from '../redux/artists';
import { getGenres } from '../redux/genres';

export class AllArtwork extends Component {
  constructor() {
    super();
    this.changeFilter = this.changeFilter.bind(this);
  }
  componentDidMount() {
    this.props.getArtworks();
    this.props.getArtists();
    this.props.getGenres();
  }
  changeFilter(ev) {
    const category = ev.target.name === 'genre' ? 'genres' : 'artist'
    if (ev.target.value === 'DEFAULT') {
      this.props.getArtworks()
    } else {
      this.props.filterArtworks(category, ev.target.value)
    }
  }
  render() {
    const { changeFilter } = this;
    return(
      <div>
        <div className="art-filters">
          <select name="artist" id="artist" defaultValue="DEFAULT" onChange={ changeFilter }>
            <option value="DEFAULT">-- Select an Artist --</option>
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
          <select name="genre" id="genre" defaultValue="DEFAULT" onChange={ changeFilter }>
            <option value="DEFAULT">-- Select a Genre --</option>
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
          {/* TBU: display "Sorry no artworks found" when filters return 0 results */}
          { (this.props.artworks || this.props.artworks.length === 0) ?
            this.props.artworks.map(artwork => {
              return (
                <div className="tile" id={ artwork.id } key= { artwork.id }>
                  {/* TBU: Will add rotating images */}
                  {/* <img src={ artwork.shopImages[0].imageURL } /> */}
                  <img src='../../server/public/img/1.jpg' />
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
    filterArtworks: (category, value) => dispatch(filterArtworks(category, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllArtwork);
