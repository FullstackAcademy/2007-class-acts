const { Artwork, Artist, Genre } = require('../server/db');

describe('Artwork model', () => {
  describe('Validations', () => {
    it('requires title, description, price, qty', async () => {
      const artwork = Artwork.build();

      try {
        await artwork.validate()
        throw Error('validation was successful but should have failed without data');
      }
      catch (err) {
        expect(err.message).toContain('cannot be null');
      }
    });
  });
});

describe('Artwork/Artist/Genre association', () => {
  let artwork1, artwork2, artist1;
  beforeEach(async () => {
    artist1 = await Artist.create({
      name: 'John Smith'
    });
    genre1 = await Genre.create({
      name: 'Impressionism'
    });
    artwork1 = await Artwork.create({
      title: 'Untitled',
      description: 'xyz',
      price: 1.00,
      quantity: 1,
      artistId: artist1.id,
    });
    artwork2 = await Artwork.create({
      title: 'Woman in Gold',
      description: 'abc',
      price: 2.00,
      quantity: 2,
      artistId: artist1.id,
    });
    await artwork1.addGenre(genre1);
    await artwork2.addGenre(genre1);
  })
  describe('Artist', () => {
    it('has associated artworks', async () => {
      const result = await artist1.hasArtworks([artwork1, artwork2]);
      expect(result).toBeTruthy();
    });
  });
  describe('Artwork', () => {
    it('has associated genre', async () => {

      const genres = await artwork1.getGenres()
      expect(genres.length).toBe(1)
      expect(genres[0].name).toBe('Impressionism');
    });
  });
});
