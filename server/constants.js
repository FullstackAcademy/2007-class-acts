const mediums = ['Graphic Art','Sculpture', 'Installation', 'Performance Art']
const orderStatuses = ['Created', 'Processing', 'Cancelled', 'Completed']
const artistProperties = ['title', 'id', 'description', 'year', 'medium', 'price', 'quantity']

const minRating = 0

const maxRating = 5

const minReviewLength = 2

const maxReviewLength = 1500

const defaultImagePath = '/public/img/default.jpg'

module.exports = {
  mediums,
  orderStatuses,
  artistProperties,
  minRating,
  maxRating,
  minReviewLength,
  maxReviewLength,
  defaultImagePath
}
