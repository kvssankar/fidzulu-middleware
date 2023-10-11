const request = require("supertest");
const app = require("../index"); // Import your Express app

describe("Express App Tests", () => {
  it("should respond with 'Running on 5000...' when the server is started", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .expect("Running on 5000...")
      .end((err, res) => {
        if (err) return done.fail(err);
        done();
      });
  });

  it("should retrieve data from the classA route", (done) => {
    request(app)
      .get("/classA") // Assuming this route exists
      .expect(200)
      .end((err, res) => {
        if (err) return done.fail(err);
        // You can add more specific assertions here
        done();
      });
  });

  it("should retrieve data from the custom route", (done) => {
    request(app)
      .get("/custom-route/servicename/all/location")
      .expect(200)
      .end((err, res) => {
        if (err) return done.fail(err);
        // You can add more specific assertions here
        done();
      });
  });
});
