const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const { sequelize } = require("./models");
const { initRoutes } = require("./routes");
const cors = require("cors");

// use cors
app.use(cors());

// install use type json
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// install use static file
const pathPublic = path.join(__dirname, "./public");
app.use("/public", express.static(pathPublic));

//initial Routes
initRoutes(app);

app.listen(port, async () => {
  console.log(`App running on the port ${port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(path.basename(__filename)); // hàm basename trả về phần cuối cùng của đường dẩn
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

/// middleware checkExists // user  seeder tạo user check token
