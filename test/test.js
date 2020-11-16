const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const Contact = require("../models/Contact");

// Assertion style
chai.should();
chai.use(chaiHttp);

describe("Contacts API", () => {
  /**
   * Test the GET route
   */

  describe("GET /contacts", () => {
    it("It should get all contacts", (done) => {
      chai
        .request(server)
        .get("/contacts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("contacts").that.length(1);
          done();
        });
    });
  });

  describe("GET /contacts", () => {
    it("It should NOT get all contacts", (done) => {
      chai
        .request(server)
        .get("/contactsd")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET (by name) route
   */

  describe("GET /contacts/:name", () => {
    it("It should get a one or more contacts by name", (done) => {
      const c = new Contact("Jon", "12345");
      chai
        .request(server)
        .get(`/contacts/${c.name}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("contacts");
          res.body.contacts
            .some(
              (contact) =>
                contact.name === c.name && contact.phoneNumber === c.phoneNumber
            )
            .should.eql(true);
          res.body.contacts.should.be.length(1);
          done();
        });
    });
  });

  describe("GET /contacts/:name", () => {
    it("It should NOT get a one or more contacts by name", (done) => {
      const c = new Contact("Jon", "12345");
      chai
        .request(server)
        .get(`/contacts/${c.name}ds`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          res.body.should.not.have.property("contacts");
          res.body.message.should.be.eq("No contact matched the query");
        });
      done();
    });
  });

  describe("GET /contacts/:name", () => {
    it("It should NOT get a one or more contacts by name", (done) => {
      const c = new Contact("Eddie", "12345");
      chai
        .request(server)
        .get(`/contacts/${c.name}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.not.have.property("contacts");
          res.body.message.should.be.eq("No contact matched the query");
        });
      done();
    });
  });

  /**
   * Test the POST route
   */

  describe("POST /contacts", () => {
    it("It should post a new contact", (done) => {
      const c = {
        name: "Tom",
        phoneNumber: "98765",
      };
      chai
        .request(server)
        .post("/contacts")
        .send(c)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.contact.should.have.property("name").eq("Tom");
          res.body.contact.should.have.property("phoneNumber").eq("98765");
        });
      done();
    });
  });
});
