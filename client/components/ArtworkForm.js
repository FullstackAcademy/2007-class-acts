import React, { Component } from 'react'
import { connect } from 'react-redux'

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
  }

  render() {
    const { title, description, year, price, quantity } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
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
    )
  }
}

const mapState = (state) => {

}

const mapDispatch = (dispatch) => {

}

export default connect(null, null)(ArtworkForm)
