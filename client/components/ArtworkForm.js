/* eslint-disable complexity */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addArtwork, editArtwork, getArtwork } from '../redux/artwork'
import { mediums } from '../../server/constants'
import axios from 'axios'

class ArtworkForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      title: '',
      description: '',
      year: '',
      price: '',
      quantity: '',
      //genres: [],
      medium: '',
      artistId: '',
    }
    this.handleChange = this.handleChange.bind(this)
    //this.handleGenreChange = this.handleGenreChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.upload = this.upload.bind(this)
  }

  componentDidMount() {
    if (!this.props.artwork && this.props.match.params.id) {
      this.props.getArtwork(this.props.match.params.id)
    }
    if (this.props.isEditing) {
      const {
        title,
        description,
        year,
        price,
        quantity,
        medium,
        artistId,
      } = this.props.artwork
      this.setState({
        title,
        description,
        year: year || '',
        price,
        quantity,
        medium: medium || '',
        artistId: artistId || ''
      })
    }
  }

  handleChange(ev) {
    const {
      target: { name, value },
    } = ev
    this.setState({ [name]: value })
  }

  /*handleGenreChange(ev) {
    const { genres } = this.state
    console.log(genres, ev.target)
  }*/

  handleSubmit(ev) {
    ev.preventDefault()
    try {
      if (this.props.isEditing) {
        this.props.editArtwork(this.props.artwork.id, this.state)
      } else {
        const form = {}
        Object.entries(this.state).forEach(([key, value]) => {
          if (value) form[key] = value
        })
        this.props.addArtwork(form)
      }
      this.setState({ redirect: true })
    } catch (err) {
      console.log(err)
    }
  }

  async deleteImage(imgId) {
    await axios.delete(`/api/artworks/images/${imgId}`)
    this.props.getArtwork(this.props.match.params.id)
  }

  async upload(e) {
    let img = e.target.files[0]
    let fd= new FormData()
    fd.append('image', img)
    await axios.post(`/api/artworks/images/${this.props.match.params.id}`, fd)
    this.props.getArtwork(this.props.match.params.id)
  }

  /*
    To-do: handle adding genres thru associations.
  */
  render() {
    const newImg = document.getElementById('newImg')
    if(newImg) newImg.addEventListener('change',e=>this.upload(e))
    const {
      title,
      description,
      year,
      price,
      quantity,
      redirect,
      medium,
      artistId,
    } = this.state
    const { isEditing, artwork, artists, genres } = this.props
    return redirect ? (
      <Redirect to={isEditing ? `/artworks/${artwork.id}` : '/'} />
    ) : (
      <div>
        <h2>
          {isEditing
            ? `Edit ${artwork.title}`
            : 'Add New Art to Collection'}
          </h2>
          <div className="edit-container">
            {!!isEditing && (
              <div className="form-img-container">
                {
                  artwork.shopImages.length && artwork.shopImages.length > 0
                  ? artwork.shopImages.map(si => {
                    return (
                      <span key={si.id} >
                        <img className="order-item-img" src={si.imageURL}/>
                        <span className="noQty" onClick={()=>this.deleteImage(si.id)}>X</span>
                      </span>
                    )
                  })
                  : <img className="order-item-img" src='/img/default.jpg'/>
                }
              </div>
            )}
          <label htmlFor="newImg">Upload Image:</label>
          <input type="file" id="newImg" name="newImg"/>
          <div className={isEditing ? "form-container" : "full-form"}>
            <form className="artwork-form" onSubmit={this.handleSubmit}>
              <label htmlFor="title">Title</label>
              <input
                name="title"
                type="text"
                value={title}
                required
                onChange={this.handleChange}/>

              <label htmlFor="artistId">Artist</label>
              <select name="artistId" value={artistId} onChange={this.handleChange}>
                <option value="">SELECT ARTIST</option>
                {artists.map((artistOption) => {
                  return (
                    <option value={artistOption.id} key={artistOption.id}>
                      {artistOption.name}
                    </option>
                  )
                })}
              </select>
                {//<button type="button">+ New Artist</button>
                }
              <label htmlFor="description"> Description</label>
              <textarea
                name="description"
                value={description}
                required
                onChange={this.handleChange}
              />

              <label htmlFor="year">Year</label>
              <input name="year" value={year} onChange={this.handleChange} />

              <label htmlFor="price">Price</label>
              <input
                name="price"
                value={price}
                required
                onChange={this.handleChange}
              />

              <label htmlFor="quantity">Quantity</label>
              <input
                name="quantity"
                value={quantity}
                required
                onChange={this.handleChange}
              />

              {/*<p>Genres</p>
              <div className="genre-list">
                {genres.map(genre => {
                  return (
                    <div className="genre-item" key={genre.id}>
                      <input type="checkbox" name="genres" value={genre.id} onChange={this.handleGenreChange}/>
                      <label htmlFor="genres">{genre.name}</label>
                    </div>
                  )
                })}
              </div>*/}

              <label htmlFor="medium">Medium</label>
              <select name="medium" value={medium} onChange={this.handleChange}>
                <option value="">SELECT MEDIUM</option>
                {mediums.map((mediumItem) => {
                  return (
                    <option value={mediumItem} key={mediumItem}>
                      {mediumItem}
                    </option>
                  )
                })}
              </select>

              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    artwork: state.artwork,
    artists: state.artists,
    genres: state.genres,
  }
}

const mapDispatch = (dispatch) => {
  return {
    addArtwork: (artwork) => dispatch(addArtwork(artwork)),
    editArtwork: (id, artwork) => dispatch(editArtwork(id, artwork)),
    getArtwork: (id) => dispatch(getArtwork(id)),
  }
}

export default connect(mapState, mapDispatch)(ArtworkForm)
