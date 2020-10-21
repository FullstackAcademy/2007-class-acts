const db = require('./db')

//I'm not sure if there's a more clever way to do this. It seems tedious to have to enter models in 4 different places
const {
  Artwork,
  ShopImage,
  Artist,
  Genre,
  User,
  Review,
  Cart,
  Session,
  Order,
  OrderItem
} = require('./models')

Artwork.belongsTo(Artist)
Artist.hasMany(Artwork)

Artwork.belongsToMany(Genre, {through: 'artworkGenre'})
Genre.belongsToMany(Artwork, {through: 'artworkGenre'})

Artist.belongsToMany(Genre, {through: 'artistGenre'})
Genre.belongsToMany(Artist, {through: 'artistGenre'})

Artwork.hasMany(ShopImage)
ShopImage.belongsTo(Artwork)

Artist.hasOne(ShopImage)
ShopImage.belongsTo(Artist)

Artwork.hasMany(Review)
User.hasMany(Review)
Review.belongsTo(User)
Review.belongsTo(Artwork)

User.hasMany(Session)
Session.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderItem)
Artwork.hasMany(OrderItem)
OrderItem.belongsTo(Order)

Cart.belongsTo(User)
User.hasOne(Cart)

Artwork.belongsToMany(Cart, {through: 'cartItem'})

const syncDB = async(forceSeed = false)=> {
  // Took out force: true so the db didn't drop the seeded data every time
  await db.sync({ force: forceSeed });
};

module.exports = {
  db,
  Artwork,
  ShopImage,
  Artist,
  Genre,
  User,
  Review,
  Cart,
  Session,
  Order,
  OrderItem,
  syncDB
}
