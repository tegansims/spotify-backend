const SpotifyWebApi = require("spotify-web-api-node");
const properties = require("../package.json");
require("dotenv").config();

const clientId = process.env.CLIENTID; // Your client id
const clientSecret = process.env.CLIENTSECRET; // Your secret
const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret
});

const getAlbums = (artistId) => spotifyApi.getArtistAlbums(artistId).then(
  (data) => data.body,
  (err) => console.error(err)
);

const getSearchTracks = (searchTerm) => spotifyApi.searchTracks(searchTerm)
  .then((data) => data.body,
    (err) => console.error(err));

const controllers = {
  about: (req, res) => {
    const aboutInfo = {
      name: properties.name,
      version: properties.version
    };
    res.json(aboutInfo);
  },
  api: (req, res) => {
    res.json({ message: "Hello from your spotify server!" });
  },
  artist: async (req, res) => {
    const { id } = req.params;
    const albums = await getAlbums(id);
    res.json({ albums });
  },
  authorise: (req, res) => {
    spotifyApi.clientCredentialsGrant().then(
      (data) => {
        console.log(`${new Date()} The access token expires in ${data.body.expires_in}`);
        console.log(`The access token is ${data.body.access_token}`);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body.access_token);
        res.json(data.body.access_token);
      },
      (err) => {
        console.log("Something went wrong when retrieving an access token", err);
      }
    );
  },
  searchTracks: async (req, res) => {
    const { searchTerm } = req.params;
    const searchedTracks = await getSearchTracks(searchTerm);
    res.json({ searchedTracks });
  },
};

module.exports = controllers;
