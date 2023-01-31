const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

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

const { readdirSync } = require("fs");
const app = express();
app.use(cors(options));

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}..`);
});
