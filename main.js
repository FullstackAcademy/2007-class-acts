const { syncDB } = require('./server/db/index');
const app = require('./server');
const PORT = process.env.PORT || 3000;

const init = () => {
  syncDB(false);
  app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
  });
};

init();
