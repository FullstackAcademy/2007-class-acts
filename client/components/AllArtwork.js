// LIBRARIES
import React, { Component } from 'react';
import { connect } from 'react-redux';

// FILES
import { getArtworks } from '../redux/artworks';
import { getArtists } from '../redux/artists';
import { getGenres } from '../redux/genres';
import { mediums } from '../../server/constants';
import ArtworkGrid from './ArtworkGrid';

export class AllArtwork extends Component {
  constructor() {
    super();
    this.state = {
      artworks: [],
      artist: '',
      genre: '',
      artists: '',
      genres: '',
      medium: ''
    }
    this.changeFilter = this.changeFilter.bind(this);
  }
  async componentDidMount() {
    await this.props.getArtworks();
    await this.props.getArtists();
    await this.props.getGenres();
    this.setState({
      artworks: this.props.artworks,
      artists: this.props.artists,
      genres: this.props.genres
    });
  }
  async changeFilter(ev) {
    const value = ev.target.value === 'DEFAULT' ? '' : ev.target.value;
    await this.setState({
      [ev.target.name]: value,
      artworks: this.props.artworks
    });
    if (this.state.artist !== '') {
      await this.setState({
        artworks: this.state.artworks.filter(art => art.artist.id === this.state.artist),
      });
    }
    if (this.state.genre !== '') {
      await this.setState({
        artworks: this.state.artworks.filter(art => {
          return art.genres
            .map(genre => genre.id)
            .includes(this.state.genre)
        })
      });
    }
    if (this.state.medium !== '') {
      await this.setState({
        artworks: this.state.artworks.filter(art => art.medium === this.state.medium)
      });
    }
  }
  render() {
    const { changeFilter } = this;
    return(
      <div>
        <div className="art-filters">
          <select name="artist" id="artist" defaultValue="DEFAULT" onChange={ changeFilter }>
            <option value="DEFAULT">ARTIST</option>
            { this.state.artists ?
              this.state.artists.map(artist => {
                return (
                  <option value={ artist.id } key={ artist.id }>{ artist.name } ({ artist.artworks.length })</option>
                )
              }) :
              <option value="N/A">---</option>
            }
          </select>
          <select name="genre" id="genre" defaultValue="DEFAULT" onChange={ changeFilter }>
            <option value="DEFAULT">GENRE</option>
            { this.state.genres ?
              this.state.genres.map(genre => {
                return (
                  <option value={ genre.id } key={ genre.id }>{ genre.name } ({ genre.artworks.length })</option>
                )
              }) :
              <option value="N/A">---</option>
            }
          </select>
          <select name="medium" id="medium" defaultValue="DEFAULT" onChange={ changeFilter }>
            <option value="DEFAULT">MEDIUM</option>
            { mediums.map(media => {
                const numArt = this.state.artworks.filter(art => art.medium === media).length;
                return (
                  <option value={ media } key={ media }>{ media } ({ numArt })</option>
                )
              })
            }
          </select>
        </div>
        <ArtworkGrid artworks={ this.state.artworks } />
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
