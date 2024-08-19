const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

router.post("/", (req, res) => {
  res.send("POST request to create testimonial/user review");
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Delete record with id ${id}`);
});

module.exports = router;
