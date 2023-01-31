const express = require("express");
const cors = require("cors");

const app = express();

let allowed = ["http://localhost:3000", "some other link"];

function options(req, res) {
  let tmp;

  let origin = req.header("Origin");
  if (allowed.indexOf(origin) > -1) {
    tmp = {
      origin: true,
      optionSuccessStatus: 200,
    };
  } else {
    tmp = {
      origin: "stupid",
    };
  }
  res(null, tmp);
}

app.use(cors(options));

app.get("/", (req, res) => {
  res.send("welcome from home");
});

app.get("/books", (req, res) => {
  res.send("welcome from books");
});

app.listen(8000, () => {
  console.log("API online!");
});
