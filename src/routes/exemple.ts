// const express = require("express");
// const router = express.Router();
// const CodeWeb = require("../models/CodeWeb");

// router.get("/", async (req, res) => {
//   try {
//     const code = await CodeWeb.find().sort({ date: 1 });
//     res.json(code);
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/search", async (req, res) => {
//   try {
//     query = [
//       {
//         $search: {
//           compound: {
//             should: [
//               {
//                 text: {
//                   path: "title",
//                   query: req.body.query,
//                   fuzzy: {
//                     maxEdits: 1,
//                     maxExpansions: 100,
//                   },
//                 },
//               },
//             ],
//             filter: [
//               {
//                 term: {
//                   query: req.body.filter,
//                   path: "keywords",
//                 },
//               },
//             ],
//           },
//           highlight: { path: "title" },
//         },
//       },
//       {
//         $sort: { score: { $meta: "textScore" } },
//       },

//       {
//         $project: {
//           _id: 1,
//           score: { $meta: "searchScore" },
//           title: 1,
//           url: 1,
//           keywords: 1,
//           highlights: { $meta: "searchHighlights" },
//         },
//       },
//     ];

//     const code = await CodeWeb.aggregate(query);

//     res.json(code);
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const newWebsites = new CodeWeb(req.body);
//     const website = await newWebsites.save();
//     res.json(website);
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const website = await CodeWeb.findOneAndUpdate(
//       { _id: req.params.id },
//       req.body
//     );
//     await website.save();
//     res.json(website);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const website = await CodeWeb.findById(req.params.id);
//     await website.remove();
//     res.json(website);
//   } catch (err) {
//     console.log(err);
//   }
// });

// module.exports = router;
