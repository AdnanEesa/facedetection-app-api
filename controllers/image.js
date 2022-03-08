const Clarifai = require("clarifai");

//console.log(Clarifai);
const app = new Clarifai.App({
  apiKey: "59841e3b9d234feea36e8c3b338a1e73",
});

const handleApiCall = (req, res) => {
  app.models
    .predict("e466caa0619f444ab97497640cefc4dc", req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Unable to work with API"));
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0].entries))
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
