import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getArtists } from '../redux/artists'

class ArtistList extends Component {
  componentDidMount() {
    if (!this.props.artists.length) this.props.getArtists()
  }

  render() {
    const { artists } = this.props
    return (
      <div>
        <h1>All Artists</h1>
        <Link to="/admin/newartist">New Artist</Link>
        <div>
          {artists.map(artist => {
            return (
              <div className="artist-grid" key={artist.id}>
                <h2>{artist.name}</h2>
                <p>{artist.nationality}</p>
                <div>
                  {artist.artworks.map(art => {
                    return (
                      <h3 key={art.id} >{art.title}</h3>
                    )
                  }
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    artists: state.artists
  }
}

const mapDispatch = (dispatch) => {
  return {
    getArtists: () => dispatch(getArtists())
  }
}

export default connect(mapState, mapDispatch)(ArtistList)
