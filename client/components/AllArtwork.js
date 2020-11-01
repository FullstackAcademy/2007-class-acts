// LIBRARIES
import React, { Component } from 'react';
import { connect } from 'react-redux';

// FILES
import { getArtworks } from '../redux/artworks';
import { getArtists } from '../redux/artists';
import { getGenres } from '../redux/genres';
import ArtworkGrid from './ArtworkGrid';
import ArtFilters from './ArtFilters';

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

  changeFilter(ev) {
    const name = ev.target.name;
    const value = ev.target.value === 'DEFAULT' ? '' : ev.target.value;

    let filteredArt = this.props.artworks;
    const artist = name === 'artist' ? value : this.state.artist;
    const genre = name === 'genre' ? value : this.state.genre;
    const medium = name === 'medium' ? value : this.state.medium;

    if (artist !== '') {
      filteredArt = filteredArt.filter(art => art.artist.id === artist);
    }
    if (genre !== '') {
      filteredArt = filteredArt.filter(art => {
        return art.genres
          .map(genre => genre.id)
          .includes(genre)
      });
    }
    if (medium !== '') {
      filteredArt = filteredArt.filter(art => art.medium === medium);
    }

    this.setState({
      name: value,
      artworks: filteredArt
    });
  }

  search(ev) {
    if (ev.key === 'Enter') {
      const searchTerm = ev.target.value;
      ev.target.value = '';
      const results = [];

      // loop through all artwork titles, artist names
      this.props.artworks.forEach(art => {
        if (art.title.toLowerCase().includes(searchTerm)) {
          results.push(art.id);
        }
      });
      this.state.artists.forEach(artist => {
        const name = artist.name.toLowerCase();
        if (name.includes(searchTerm)) {
          this.props.artworks
            .filter(art => art.artist.name.toLowerCase() === name)
            .map(art => art.id)
            .forEach(art => results.push(art))
        }
      });

      // set state to show matching results only
      this.setState({
        artworks: this.props.artworks.filter(art => results.includes(art.id))
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

  render() {
    const { changeFilter, search, reset } = this;
    const { artworks, artists, genres } = this.state;
    return(
      <div>
        <div className="top-section">
          <ArtFilters artworks={ artworks } artists={ artists } genres={ genres } changeFilter={ changeFilter } />
          <div className="side-bar">
            <input type="text" placeholder="SEARCH COLLECTION" onKeyDown={ search } />
            <button type="reset" onClick={ reset }>CLEAR FILTERS</button>
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
