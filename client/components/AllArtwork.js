// LIBRARIES
import React, { Component } from 'react';
import { connect } from 'react-redux';

// FILES
import { getArtworks } from '../redux/artworks';
import { getArtists } from '../redux/artists';
import { getGenres } from '../redux/genres';
import ArtworkGrid from './ArtworkGrid';
import ArtFilters from './ArtFilters';
// import axios from 'axios';

export class AllArtwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artworks: [],
      artists: '',
      genres: '',
      artist: '',
      genre: '',
      medium: ''
    }
    this.changeFilter = this.changeFilter.bind(this);
    this.search = this.search.bind(this);
    this.reset = this.reset.bind(this);
    this.getArtPerGenre = this.getArtPerGenre
  }
  async componentDidMount() {
    //added this condition so the data doesn't reload
    if(this.props.artworks.length === 0) {
      await this.props.getArtworks();
      await this.props.getArtists();
      await this.props.getGenres();
    }
    this.setState({
      artworks: this.props.artworks,
      artists: this.props.artists,
      genres: this.props.genres
    });
  }

  // Not sure how to remove the first await in this function. State needs to be reset before the rest of the filters can be assessed.
  async changeFilter(ev) {
    const value = ev.target.value === 'DEFAULT' ? '' : ev.target.value;
    await this.setState({
      [ev.target.name]: value,
      artworks: this.props.artworks
    });
    if (this.state.artist !== '') {
      this.setState({
        artworks: this.state.artworks.filter(art => art.artist.id === this.state.artist),
      });
    }
    if (this.state.genre !== '') {
      this.setState({
        artworks: this.state.artworks.filter(art => {
          return art.genres
            .map(genre => genre.id)
            .includes(this.state.genre)
        })
      });
    }
    if (this.state.medium !== '') {
      this.setState({
        artworks: this.state.artworks.filter(art => art.medium === this.state.medium)
      });
    }
  }

  async search(ev) {
    if (ev.key === 'Enter') {
      const searchTerm = ev.target.value;
      const results = [];
      ev.target.value = '';
      // restore state to original
      await this.setState({
        artworks: this.props.artworks
      });
      // loop through all artwork titles, artist names
      this.state.artworks.forEach(art => {
        if (art.title.toLowerCase().includes(searchTerm)) {
          results.push(art.id);
        }
      });
      this.state.artists.forEach(artist => {
        const name = artist.name.toLowerCase();
        if (name.includes(searchTerm)) {
          this.state.artworks
            .filter(art => art.artist.name.toLowerCase() === name)
            .map(art => art.id)
            .forEach(art => results.push(art))
        }
      });
      // set state to show matching results only
      this.setState({
        artworks: this.state.artworks.filter(art => results.includes(art.id))
      });
    }
  }

  reset() {
    this.setState({
      artworks: this.props.artworks,
      artist: '',
      genre: '',
      medium: ''
    });
    // reset "select" selected option
    document.getElementById("artist").value = "DEFAULT";
    document.getElementById("genre").value = "DEFAULT";
    document.getElementById("medium").value = "DEFAULT";
  }

  // async getArtPerGenre(genreId) {
  //   const currGenre = await axios.get(`/api/genres/${genreId}`);
  //   return currGenre.data.artworks.length;
  // }

  render() {
    const { changeFilter, search, reset, getArtPerGenre } = this;
    const { artworks, artists, genres } = this.state;
    return(
      <div>
        <div className="top-section">
          <ArtFilters artworks={ artworks } artists={ artists } genres={ genres } changeFilter={ changeFilter } /*getArtPerGenre={ getArtPerGenre } */ />
          <div className="side-bar">
            <input type="text" placeholder="SEARCH COLLECTION" onKeyDown={ search } />
            <button type="text" onClick={ reset }>CLEAR FILTERS</button>
          </div>
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
    genres: state.genres,
    user: state.user
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
