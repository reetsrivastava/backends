const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const { dbConnect } = require("./db/db.connect.js");
const { errorRouteHandler } = require("./middlewares/404Handler.middleware");
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { authVerify } = require("./middlewares/authVerify.middleware");

const app = express();
app.use(cors());
app.use(morgan("common"));
app.use(express.json());
dbConnect();

app.use("/auth", require("./routes/user.route"))
app.use("/videos", require("./routes/videos.route"));
app.use("/views",require("./routes/views.route"))
app.use("/playlists", authVerify, require("./routes/playlist.route"));
app.use("/likes", authVerify, require("./routes/likes.route"));
app.use("/watchlist", authVerify, require("./routes/watchlist.route"))

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

// Error Handling
app.use(errorRouteHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('server started');
});