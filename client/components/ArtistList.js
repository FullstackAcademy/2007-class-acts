import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getArtists } from '../redux/artists'
import { _getArtist } from '../redux/artist'

class ArtistList extends Component {
  constructor(props) {
    super(props)
    this.selectArtist = this.selectArtist.bind(this)
  }
  componentDidMount() {
    if (!this.props.artists.length) this.props.getArtists()
  }

  selectArtist(id) {
    this.props.getArtist(this.props.artists.find(artist => artist.id === id))
  }

  render() {
    const { artists } = this.props
    return (
      <div>
        <h1>All Artists</h1>
        <Link to="/admin/newartist">New Artist</Link>
        <div className="artist-grid">
          {artists.map(artist => {
            return (
              <div className="artist-tile" key={artist.id}>
                <h2>
                  {artist.name}
                  <Link to={`/admin/artist/edit/${artist.id}`} onClick={() => this.selectArtist(artist.id)}>✐</Link>
                </h2>
                <p>Nationality: {artist.nationality}</p>
                <div>
                  <h3>Current Inventory</h3>
                  {artist.artworks ?
                    (artist.artworks.length ?
                      artist.artworks.map(art => {
                        return (<p key={art.id} >
                          <Link to={`/artworks/${art.id}`}>
                            {art.title} ({art.quantity ? art.quantity : 'Out of Stock'})
                          </Link></p>)
                      })
                      : <p>None, yet!</p>)
                    : <p>Nothing, this artist must be new!</p>}
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
    getArtists: () => dispatch(getArtists()),
    getArtist: (artist) => dispatch(_getArtist(artist))
  }
}

export default connect(mapState, mapDispatch)(ArtistList)
