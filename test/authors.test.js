//During the test the env variable is set to test
process.env.NODE_ENV = "test";

var Author = require("../models/authors.model");

//Require the dev-dependencies
var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe("Authors", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    Author.remove({}, (err) => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET author", () => {
    it("it should GET all the authors", (done) => {
      chai
        .request(server)
        .get("/author")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
