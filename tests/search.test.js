const request = require("supertest")("https://api.spotify.com/v1/search");
const { expect } = require("chai");

describe("GET /search", () => {
  it("returns a 401 unauthorised message when accessed without a token", async () => {
    const response = await request.get("?query=jack+grealish&offset=0&limit=20&type=track");
    expect(response.status).to.eql(401);
  });
});
