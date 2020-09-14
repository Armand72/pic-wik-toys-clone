const request = require("supertest");
const appServer = require("./src/server");
require("dotenv").config();

describe("Application test", () => {
  afterAll((done) => {
    appServer.close();
    done();
  });

  // //Login

  let _id;
  let cookie;
  let product_id;
  let cart_id;

  //  user
  describe("user process Test", () => {
    it("create a new user", async (done) => {
      const data = {
        name: "ArmandPicWIk",
        email: "armandpicwik@hotmail.fr",
        password: "factice",
      };

      const res = await request(appServer).post("/api/users").send(data);

      expect(res.statusCode).toEqual(200);
      expect(res.body.user.name).toEqual(data.name);
      expect(typeof res.body.user._id).toEqual("string");

      _id = res.body.user._id;
      cookie = res.headers["set-cookie"][0];

      done();
    });

    it("login user", async (done) => {
      const data = {
        email: "armandpicwik@hotmail.fr",
        password: "factice",
      };

      const res = await request(appServer).post("/api/users/login").send(data);

      expect(res.statusCode).toEqual(200);
      expect(res.body.user.name).toEqual("ArmandPicWIk");
      expect(typeof res.body.user._id).toEqual("string");
      done();
    });

    it("check user", async (done) => {
      const res = await request(appServer)
        .post("/api/users/check")
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  let basket = {
    name: "barbie",
    brand: "smooby",
    ageMin: "à partir de deux ans",
    description: "c'est un jouet",
    price: 9.99,
    src: "/images/barbie.jpg",
    alt: "barbie",
  };

  //  products

  describe("products Test", () => {
    it("create a new product", async (done) => {
      const res = await request(appServer)
        .post("/api/products")
        .send(basket)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);

      product_id = res.body._id;
      done();
    });

    it("modify a product", async (done) => {
      basket = {
        name: "action man",
        brand: "smoby",
        ageMin: "à partir de un an",
        description: "c'est un jouet action man",
        price: 19.99,
        src: "/images/action.jpg",
        alt: "action",
      };
      const res = await request(appServer)
        .put(`/api/products/${product_id}`)
        .send(basket)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);
      done();
    });

    it("get a product", async (done) => {
      const res = await request(appServer)
        .get(`/api/products/${product_id}`)

        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  describe("basket Test", () => {
    it("create a new basket", async (done) => {
      const data = {
        user: _id,
        productList: [basket],
        totalPrice: 9.99,
        totalQuantity: 1,
        totalAmount: 69.99,
        fee: "60",
      };
      const res = await request(appServer)
        .post("/api/baskets")
        .send(data)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);
      cart_id = res.body._id;

      done();
    });

    it("get user basket", async (done) => {
      const res = await request(appServer)
        .get(`/api/baskets/${cart_id}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);
      done();
    });

    it("modify user basket", async (done) => {
      const data = {
        user: _id,
        productList: basket,
        totalPrice: 69.99,
        totalQuantity: 3,
        totalAmount: 69.99,
        fee: "OFFERT",
      };

      const res = await request(appServer)
        .put(`/api/baskets/${_id}`)
        .send(data)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  // cleanup

  describe("cleanup of the database", () => {
    it("delete a product", async (done) => {
      const res = await request(appServer)
        .delete(`/api/products/${product_id}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);

      done();
    });

    it("delete user basket", async (done) => {
      const res = await request(appServer)
        .delete(`/api/baskets/${_id}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);
      done();
    });

    it("remove user", async (done) => {
      const res = await request(appServer)
        .delete(`/api/users/${_id}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);

      done();
    });
  });
});
