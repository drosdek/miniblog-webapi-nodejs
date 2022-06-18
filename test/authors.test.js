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
        .get("/authors")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST author", () => {
    it('it should not POST a author without "firstName" field', (done) => {
      let author = {
        lastName: "Leonard",
        age: 30,
        email: "teste@teste.com",
      };
      chai
        .request(server)
        .post("/authors")
        .send(author)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(
              "author validation failed: firstName: Path `firstName` is required."
            );
          done();
        });
    });
    it('it should not POST a author without "lastName" field', (done) => {
      let author = {
        firstName: "Author",
        age: 30,
        email: "teste@teste.com",
      };
      chai
        .request(server)
        .post("/authors")
        .send(author)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(
              "author validation failed: lastName: Path `lastName` is required."
            );
          done();
        });
    });
    it('it should not POST a author without "age" field', (done) => {
      let author = {
        firstName: "Author",
        lastName: "Leonard",
        email: "teste@teste.com",
      };
      chai
        .request(server)
        .post("/authors")
        .send(author)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("author validation failed: age: Path `age` is required.");
          done();
        });
    });
    it('it should not POST a author without "email" field', (done) => {
      let author = {
        firstName: "Author",
        lastName: "Leonard",
        age: 30,
      };
      chai
        .request(server)
        .post("/authors")
        .send(author)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("author validation failed: email: Path `email` is required.");
          done();
        });
    });
    it("it should POST a author ", (done) => {
      let author = {
        firstName: "Author",
        lastName: "Leonard",
        age: 30,
        email: "teste@teste.com",
      };
      chai
        .request(server)
        .post("/authors")
        .send(author)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("firstName");
          res.body.should.have.property("lastName");
          res.body.should.have.property("age");
          res.body.should.have.property("email");
          done();
        });
    });
  });
  describe("/GET/:id author", () => {
    it("it should GET ID a author by the given id", (done) => {
      let author = new Author({
        firstName: "Author",
        lastName: "Leonard",
        age: 30,
        email: "teste@teste.com",
      });
      author.save((err, author) => {
        chai
          .request(server)
          .get("/authors/" + author.id)
          .send(author)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("firstName");
            res.body.should.have.property("lastName");
            res.body.should.have.property("age");
            res.body.should.have.property("email");
            res.body.should.have.property("id").eql(author.id);
            done();
          });
      });
    });
  });
  describe("/PUT/:id author", () => {
    it("it should UPDATE a author given the id", (done) => {
      let author = new Author({
        firstName: "Author",
        lastName: "Leonard",
        age: 30,
        email: "teste@teste.com",
      });
      author.save((err, author) => {
        chai
          .request(server)
          .put("/authors/" + author.id)
          .send({
            firstName: "Author",
            lastName: "Da Vinci",
            age: 30,
            email: "teste@teste.com",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("firstName");
            res.body.should.have.property("lastName");
            res.body.should.have.property("age");
            res.body.should.have.property("email");
            done();
          });
      });
    });
  });
});
