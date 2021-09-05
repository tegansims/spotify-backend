const controller = require("./controller");

module.exports = (app) => {
  app.route("/about")
    .get(controller.about);
  app.route("/authorise")
    .get(controller.authorise);
  app.route("/api")
    .get(controller.api);
  app.route("/artist/:id").get(controller.artist);
  app.route("/tracks/search/:searchTerm").get(controller.searchTracks);
};
