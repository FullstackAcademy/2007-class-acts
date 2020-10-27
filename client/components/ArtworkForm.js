import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addArtwork } from '../redux/artwork'

class ArtworkForm extends Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
      title: '',
      description: '',
      year: '',
      price: '',
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    const { target: { name, value } } = ev
    this.setState({ [name]: value })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    if (this.state.isEditing) {
      //do stuff
    } else {
      const newArt = {...this.state}
      this.props.addArtwork(newArt)
    }
  }
  /*
    To-do: handle adding artist and genres thru associations. create a form for adding an artist as well?
  */
  render() {
    const { title, description, year, price, quantity } = this.state
    return (
      <div className="form-container">
        <h2>Add New Art to Collection</h2>
        <form id="artwork-form" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input name="title" type="text" value={title} onChange={this.handleChange} />
          <label>Description</label>
          <textarea name="description" value={description} onChange={this.handleChange} />
          <label htmlFor="year">Year</label>
          <input name="year" value={year} onChange={this.handleChange} />
          <label htmlFor="price">Price</label>
          <input name="price" value={price} onChange={this.handleChange} />
          <label htmlFor="quantity">Quantity</label>
          <input name="quantity" value={quantity} onChange={this.handleChange} />
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    artwork: state.artwork
  }
}

const mapDispatch = (dispatch) => {
  return {
    addArtwork: (artwork) => dispatch(addArtwork(artwork))
  }
}

export default connect(mapState, mapDispatch)(ArtworkForm)
