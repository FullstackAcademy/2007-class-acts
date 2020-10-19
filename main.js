const seed = require('./seed');
const app = require('./server');
const PORT = process.env.PORT || 3000;

const init = async () => {
  await seed();
  app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
  });
};

init();
