const express = require("express");
const app = express();
const mysql = require("mysql");
const { join } = require("path");
// const { render } = require("ejs");

// this is to convert json

const port = 3000;

app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_db",
});

let cars = [
  ["Kia", "2017", 100000],
  ["Mitsubishi", "2017", 150000],
  ["Tesla", "2017", 250000],
];

let oldCars = [
  {
    brand: "Ford",
    model: "model T",
    year: 1988,
    color: 1,
  },
  {
    brand: "Chevrolet",
    model: "Camero",
    year: 1992,
    color: 1,
  },
  {
    brand: "Dodge",
    model: "Challenger",
    year: 1995,
    color: 1,
  },
];

let inserIntro = `INSERT INTO products(\`title\`, \`body\`, \`price\`, \`cat_id\`)
VALUES`;

let msg = "";

oldCars.forEach((car, index) => {
  let sign = index === oldCars.length - 1 ? " ; " : " , ";
  msg += `("${car.brand}","${car.model}", ${car.year},${car.color})${sign}`;
});
let builtQuer = inserIntro + msg;

let insertProcduct = () => {
  let inserFruit = builtQuer;
  connection.query(inserFruit, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
};

// insertProcduct();

const selectProds = async () => {
  let query = `SELECT * FROM products`;

  let data = await connection.query(query, (err, reoult) => {
    if (err) console.log(err);
    console.log(reoult);
  });
  console.log(data);
  return data;
};

//  selectProds()
// let myFavFruits = ["Pomala", "Banana", "Orange", "watermalon", "pineappel"];
// let choseFruit = () => {
//   let rand = Math.floor(Math.random() * 5);

//   let { title, body, pricem, catId } = req.body;
//   let inserFruit = `INSERT INTO products(\`title\`, \`body\`, \`price\`, \`cat_id\`)
//   VALUES(${title}, ${body}, ${pricem}, ${catId}),
//   `;
//   connection.query(inserFruit, (err, res) => {
//     if (err) console.log(err);
//     res.render("add.ejs");
//   });

//   return myFavFruits[rand];
// };

app.post("/insertProd", (req, res) => {
  let { title, body, price, catagory } = req.body;
  let query = `INSERT INTO products (\`title\`, \`body\`, \`price\`, \`cat_id\`) VALUES
("${title}", "${body}", ${price}, ${catagory});`;

  connection.query(query, (err, result) => {
    if (err) console.log(err);
  });

  res.redirect("/fruits");
});

// update Product
app.post("/update/:id", (req, res) => {
  let id = req.params.id;
  let { title, body, price, catagory } = req.body;

  let query = `UPDATE products
  SET \`title\` = "${title}", \`body\` ="${body}", \`price\`=  ${price},  \`cat_id\`=  ${catagory}
  WHERE \`id\` = ${id}
;`;
  connection.query(query, (err, resoult) => {
    if (err) throw err;
    console.log(resoult);
  });
  res.redirect("/fruits");
});
// update Navgation
app.get("/update/:id", (req, res) => {
  let id = req.params.id;
  let query = `SELECT * FROM products
  WHERE \`id\` = ${id}
  `;
  connection.query(query, (err, resoult) => {
    if (err) console.log(err);
    console.log(resoult);
    res.render("update.ejs", { resoult });
  });
});
// delete
app.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  let query = `DELETE FROM products
 WHERE \`id\` =  ${id};
 `;
  connection.query(query, (err, resoult) => {
    if (err) throw err;
    console.log(resoult);
  });
  res.redirect("/fruits");
});

// A navagation endpoint
app.get("/add", (req, res) => {
  res.render("addNew.ejs");
});

app.get("/fruits", async (req, res) => {
  let query = `SELECT * FROM products`;
  await connection.query(query, (err, reoult) => {
    if (err) console.log(err);

    res.render("index.ejs", { reoult });
  });
});

// insertProcduct();
// selectProds();

app.listen(port, () => {
  console.log(`listining on port ${port}`);
});


// using css
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index', { foo: 'FOO' });
});
