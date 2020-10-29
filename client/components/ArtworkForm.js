import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addArtwork } from '../redux/artwork'
import { mediums } from '../../server/constants'

class ArtworkForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      redirect: false,
      title: '',
      description: '',
      year: '',
      price: '',
      quantity: '',
      //genres: [],
      medium: '',
      artistId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    const { target: { name, value } } = ev
    this.setState({ [name]: value })
  }

  handleGenreChange(ev) {
    const { genres } = this.state
    console.log(genres, ev.target)
  }

  handleSubmit(ev) {
    ev.preventDefault()
    if (this.state.isEditing) {
      //do stuff
    } else {
      try {
        const form = {}
        Object.entries(this.state).forEach(([key, value]) => {
          if (value) {
            form[key] = value
          }
        })
        this.props.addArtwork(form)
        this.setState({redirect: true})
      } catch (err) {
        console.log(err)
      }
    }
  }
  /*
    To-do: handle adding artist and genres thru associations. create a form for adding an artist as well?
  */
  render() {
    const { title, description, year, price, quantity, redirect, medium, artistId  } = this.state
    const { artwork, artists, genres } = this.props
    return redirect ?
      <Redirect to='/' />
      : (
      <div className="form-container">
        <h2>Add New Art to Collection</h2>
        <form id="artwork-form" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input name="title" type="text" value={title} required onChange={this.handleChange} />

          <label htmlFor="artistId">Artist</label>
            <select name="artistId" value={artistId} onChange={this.handleChange}>
            <option value="">Other</option>
            {artists.map(artistOption => {
              return (<option value={artistOption.id} key={artistOption.id}>{artistOption.name}</option>)
            })}
          </select>
          {
            //<button type="button">+ New Artist</button>
          }
          <label htmlFor="description"> Description</label>
          <textarea name="description" value={description} required onChange={this.handleChange} />

          <label htmlFor="year">Year</label>
          <input name="year" value={year} onChange={this.handleChange} />

          <label htmlFor="price">Price</label>
          <input name="price" value={price} required onChange={this.handleChange} />

          <label htmlFor="quantity">Quantity</label>
          <input name="quantity" value={quantity} required onChange={this.handleChange} />

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
            {mediums.map(mediumItem => {
              return (<option value={mediumItem} key={mediumItem}>{mediumItem}</option>)
            })}
          </select>


          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    artwork: state.artwork,
    artists: state.artists,
    genres: state.genres
  }
}

const mapDispatch = (dispatch) => {
  return {
    addArtwork: (artwork) => dispatch(addArtwork(artwork))
  }
}

export default connect(mapState, mapDispatch)(ArtworkForm)
