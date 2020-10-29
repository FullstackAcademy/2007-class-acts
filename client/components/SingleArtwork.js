import React from 'react'
import { connect } from 'react-redux'
import { getArtwork } from '../redux/artwork'
import { Link } from 'react-router-dom'

export class SingleArtwork extends React.Component {
  async componentDidMount() {
    await this.props.getArtwork(this.props.match.params.id)
  }

  render() {
    console.log('props in render', this.props.artwork)
    const { isAdmin, artwork } = this.props
    return (
      <div>
        <div>
          {this.props.artwork.shopImages ? (
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  padding: '1rem',
                  maxWidth: '40%',
                  minWidth: '40%',
                }} /* Added inline temporary styling, to see how it looks*/
              >
                <img
                  src={this.props.artwork.shopImages.length ? this.props.artwork.shopImages[0].imageURL : '/img/default.jpg'}
                  style={{ maxWidth: '100%' }}
                />
                <p>
                  <Link to="/">Back</Link>
                </p>
              </div>
              <div style={{ padding: '1rem' }}>
                {!!isAdmin && <Link to={`/admin/artworks/edit/${artwork.id}`}>Edit</Link>}
                <h2>{this.props.artwork.title}</h2>
                <p>{`By ${this.props.artwork.artist ? this.props.artwork.artist.name : 'Unknown'}`}</p>
                <p>{`$${this.props.artwork.price}`}</p>

                <hr />
                <h2>Art Description</h2>
                <p>{this.props.artwork.description}</p>
                <hr />

                <h2>Artist Bio</h2>
                <p>{this.props.artwork.artist ? this.props.artwork.artist.bio : 'Nothing is known about this artist'}</p>
              </div>
            </div>
          ) : (
            <h2>No image found</h2>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isAdmin } = state.user
  return {
    artwork: state.artwork,
    isAdmin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtwork: (id) => dispatch(getArtwork(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleArtwork)
