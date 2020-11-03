const mediums = ['Graphic Art', 'Sculpture', 'Installation', 'Performance Art']
const orderStatuses = ['Created', 'Processing', 'Cancelled', 'Completed']
const artistProperties = ['id', 'name', 'bio', 'nationality']
const artProperties = [
  'title',
  'id',
  'description',
  'year',
  'medium',
  'price',
  'quantity',
  'artistId',
]

const minRating = 0

const maxRating = 5

const minReviewLength = 2

const maxReviewLength = 1500

const defaultImagePath = '/public/img/default.jpg'

const stripeAPIKey = 'pk_test_51HjGjMLMMiRvpdjj8pIO1leyiuo0sHCfIcH4437cdtmWMq3aRiK3fROypgpjSsZQrzR6bUsODr2dpyYKyHZ1NF1800cVYF22cl'

module.exports = {
  mediums,
  orderStatuses,
  artProperties,
  artistProperties,
  minRating,
  maxRating,
  minReviewLength,
  maxReviewLength,
  defaultImagePath,
  stripeAPIKey
}
