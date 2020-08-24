const request = require("supertest");
const app = require("../server");
require("dotenv").config();

const TEST_USERNAME = process.env.TEST_USERNAME;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

describe("Application test", () => {
  let token = "";

  let userAccess = {
    username: TEST_USERNAME,
    password: TEST_PASSWORD,
  };

  beforeAll(async (done) => {
    const res = await request(app).post("/api/login").send(userAccess);
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body.token).toEqual("string");
    token = res.body.token;
    done();
  });

  afterAll((done) => {
    app.close();
    done();
  });

  //Login

  describe("authentication", () => {
    it("Login", async (done) => {
      const res = await request(app).post("/api/login").send(userAccess);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body.token).toEqual("string");
      done();
    });
  });
  // image

  let image_id = 0;

  describe("image", () => {
    let ImageData = {
      alt: "photo bébé",
      source: "babyimage.png",
    };

    it("create new image", async (done) => {
      const res = await request(app)
        .post("/api/image")
        .send(ImageData)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual("number");
      image_id = res.body;
      done();
    });

    ImageData = {
      alt: "photo enfant",
      source: "childimage.png",
    };

    it("modify image", async (done) => {
      const res = await request(app)
        .put(`/api/image/${image_id}`)
        .send(ImageData)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual("number");

      done();
    });
  });

  // USER DATA

  let user_id = 1;

  describe("User", () => {
    let newUser = {
      username: "armand",
      password: "armand72",
      email: "arm@hotmail.fr",
      connected: "false",
      image_id,
    };

    it("create new user", async (done) => {
      const res = await request(app).post("/api/user").send(newUser);
      expect(res.statusCode).toEqual(200);
      done();
    });

    it("get id user", async (done) => {
      const res = await request(app)
        .get(`/api/user/byname/${newUser.username}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body.id).toEqual("number");
      user_id = res.body.id;
      done();
    });

    it("get a specific user", async (done) => {
      const res = await request(app)
        .get(`/api/user/${user_id}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });

    newUser = {
      username: "jerome",
      password: "jerome72",
      email: "jerome@hotmail.fr",
      connected: true,
      image_id: 2,
    };

    it("modify user", async (done) => {
      const res = await request(app)
        .put(`/api/user/${user_id}`)
        .send(newUser)
        .set("authorization", "bearer " + token);
      expect(res.body).toEqual(newUser);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  //Children TEST

  let children_id = undefined;

  describe("Children", () => {
    let modifyChildren_id;

    let childrenData = {
      firstname: "cécile",
      lastname: "Bouchard",
      birthday: "2020-02-02",
      parentone: "caroline Bouchard",
      parenttwo: "cindy Bouchard",
      telephone: "0615689998",
      email: "capitoum@gmail.fr",
      address: "64 rue xxxx",
      image_id: 1,
    };

    afterAll(() => {
      console.log(modifyChildren_id, "a voir");
      children_id = modifyChildren_id;
    });

    it("create children", async (done) => {
      console.log(childrenData, token);
      const res = await request(app)
        .post(`/api/children`)
        .send(childrenData)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual("number");
      modifyChildren_id = res.body;
      done();
    });

    const idData = {
      user_id,
      children_id: modifyChildren_id,
    };

    it("create link between user and children", async (done) => {
      const idData = {
        user_id,
        children_id: modifyChildren_id,
      };
      const res = await request(app)
        .post(`/api/user_children`)
        .send(idData)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual("number");
      done();
    });

    it("modify children", async (done) => {
      const res = await request(app)
        .post(`/api/children`)
        .send(childrenData)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual("number");
      done();
    });

    it("get children from user", async (done) => {
      const res = await request(app)
        .get(`/api/children/${user_id}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });

    it("get specific child", async (done) => {
      const res = await request(app)
        .get(`/api/children/child/${modifyChildren_id}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  console.log(children_id);
  //FOOD

  describe("Food", () => {
    console.log(children_id);

    let foodId = 0;

    it("create a new meal", async (done) => {
      const foodData = [
        ["poulet", children_id],
        ["petit pois", children_id],
      ];
      const res = await request(app)
        .post(`/api/food`)
        .send(foodData)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      foodId = res.body;
      done();
    });

    it("get food", async (done) => {
      const res = await request(app)
        .get(`/api/food/${children_id}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });

    it("delete food", async (done) => {
      const res = await request(app)
        .get(`/api/food/${foodId}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
  // GAMES

  describe("Games", () => {
    let toyId = 0;

    it("create a new toy", async (done) => {
      const toysData = [
        ["poupée", children_id],
        ["ACTION MAN", children_id],
      ];
      const res = await request(app)
        .post(`/api/games/toys`)
        .send(toysData)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      toyId = res.body;
      done();
    });

    it("get all toys from a child", async (done) => {
      const res = await request(app)
        .get(`/api/games/toys/${children_id}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });

    it("delete child ", async (done) => {
      const res = await request(app)
        .delete(`/api/games/toy/${toyId}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });

    let boardgameId = 0;

    it("create a new boardgame", async (done) => {
      const boardgamesData = [
        ["monopoly", children_id],
        ["bonne paye", children_id],
      ];

      const res = await request(app)
        .post(`/api/games/boardgames`)
        .send(boardgamesData)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      boardgameId = res.body;
      done();
    });

    it("get all boardgames from a child", async (done) => {
      const res = await request(app)
        .get(`/api/games/boardgames/${children_id}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });

    it("delete boardgame ", async (done) => {
      const res = await request(app)
        .delete(`/api/games/boardgame/${boardgameId}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  // MEDICATION

  describe("Medication", () => {
    let medicationId = 0;

    it("create a new medication", async (done) => {
      let Data = {
        name: "doliprane",
        start: "2020-02-22",
        end: "2020-03-30",
        description: "à prendre tous les soirs",
        children_id,
      };

      const res = await request(app)
        .post(`/api/medication`)
        .send(Data)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual("number");
      medicationId = res.body;
      done();
    });

    it("get all medication from a child", async (done) => {
      let data = {
        name: "doliprane",
        start: "22/02/2020",
        end: "30/03/2020",
        description: "à prendre tous les soirs",
      };

      const res = await request(app)
        .get(`/api/medication/${children_id}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      expect(res.body[0].name).toEqual(data.name);
      expect(res.body[0].start).toEqual(data.start);
      expect(res.body[0].end).toEqual(data.end);
      expect(res.body[0].description).toEqual(data.description);
      done();
    });

    it("modify medication", async (done) => {
      const medicationData = {
        name: "efferalgan",
        start: "2020-02-20",
        end: "2020-03-05",
        description: "à prendre tous les matins",
      };
      const res = await request(app)
        .put(`/api/medication/${medicationId}`)
        .send(medicationData)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual(medicationData.name);
      expect(res.body.start).toEqual(medicationData.start);
      expect(res.body.end).toEqual(medicationData.end);
      expect(res.body.description).toEqual(medicationData.description);
      expect(res.body.idChild).toEqual(medicationData.idChild);
      done();
    });

    it("delete medication ", async (done) => {
      const res = await request(app)
        .delete(`/api/medication/${medicationId}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual("number");
      done();
    });
  });
  // ALLERGIES

  describe("Allergies", () => {
    let allergieId = 0;

    it("create a new allergies", async (done) => {
      const allergiesData = [
        ["pollen", children_id],
        ["peanuts", children_id],
      ];
      const res = await request(app)
        .post(`/api/medication/allergies`)
        .send(allergiesData)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      allergieId = res.body;
      done();
    });

    it("get all allergies from a child", async (done) => {
      const res = await request(app)
        .get(`/api/medication/allergies/${children_id}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });

    it("delete allergies ", async (done) => {
      const res = await request(app)
        .delete(`/api/medication/allergies/${allergieId}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
  //   // CHAT

  describe("Chat", () => {
    let messageData = {
      message: "helloooooo",
      time: "2020-02-02",
      user_id,
      children_id,
    };

    it("create a new message", async (done) => {
      const res = await request(app)
        .post(`/api/chat/message`)
        .send(messageData)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });

    it("get all users from a conversation", async (done) => {
      const res = await request(app)
        .get(`/api/chat/listUser/${children_id}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });

    it("get all messages from a conversation", async (done) => {
      const res = await request(app)
        .get(`/api/chat/listMessages/${children_id}`)
        .set("authorization", "bearer " + token);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
  //   // DELETE Child

  //   describe("Delete Child", () => {
  //     it("delete all food related to child ", async (done) => {
  //       const res = await request(app)
  //         .delete(`/api/children/food/${children_id}`)
  //         .set("authorization", "bearer " + token);
  //       expect(res.statusCode).toEqual(200);
  //       done();
  //     });

  //     it("delete all boardgames related to child ", async (done) => {
  //       const res = await request(app)
  //         .delete(`/api/children/boardgames/${children_id}`)
  //         .set("authorization", "bearer " + token);
  //       expect(res.statusCode).toEqual(200);
  //       done();
  //     });

  //     it("delete all toys related to child ", async (done) => {
  //       const res = await request(app)
  //         .delete(`/api/children/toys/${children_id}`)
  //         .set("authorization", "bearer " + token);
  //       expect(res.statusCode).toEqual(200);
  //       done();
  //     });

  //     it("delete all allergies related to child ", async (done) => {
  //       const res = await request(app)
  //         .delete(`/api/children/allergies/${children_id}`)
  //         .set("authorization", "bearer " + token);
  //       expect(res.statusCode).toEqual(200);
  //       done();
  //     });

  //     it("delete all medication related to child ", async (done) => {
  //       const res = await request(app)
  //         .delete(`/api/children/medication/${children_id}`)
  //         .set("authorization", "bearer " + token);
  //       expect(res.statusCode).toEqual(200);
  //       done();
  //     });

  //     it("delete all connectionsrelated to child ", async (done) => {
  //       const res = await request(app)
  //         .delete(`/api/children/user_children/${children_id}`)
  //         .set("authorization", "bearer " + token);
  //       expect(res.statusCode).toEqual(200);
  //       done();
  //     });

  //     it("delete all messages related to child ", async (done) => {
  //       const res = await request(app)
  //         .delete(`/api/children/message/${children_id}`)
  //         .set("authorization", "bearer " + token);
  //       expect(res.statusCode).toEqual(200);
  //       done();
  //     });

  //     it("delete child", async (done) => {
  //       const res = await request(app)
  //         .delete(`/api/children/child/${children_id}`)
  //         .set("authorization", "bearer " + token);
  //       expect(res.statusCode).toEqual(200);
  //       done();
  //     });
  //   });

  //   describe("Delete user", () => {
  //     it("delete user", async (done) => {
  //       const res = await request(app)
  //         .delete(`/api/user/${user_id}`)
  //         .set("authorization", "bearer " + token);
  //       expect(res.statusCode).toEqual(200);
  //       done();
  //     });
  //   });
});
