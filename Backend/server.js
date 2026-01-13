const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5050;
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/pizzeria")
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch((err) => {
    console.log(err);
});
const Pizza = mongoose.model("Pizzas", {
    id: String,
    type: String,
    price: Number,
    name: String,
    image: String,
    description: String,
    ingredients: [{
        id: String,
        iname: String
    }],
    topping: [{
        id: String,
        tname: String,
        price: Number
    }]
});

const Ingredient = mongoose.model("Ingredients", {
    id: String,
    tname: String,
    price: Number,
    image: String

});


app.get('/pizzas', async (req, res)=>{
    const pizzas = await Pizza.find()
    res.json(pizzas);
});


app.get('/ingredients', async (req, res)=>{
    const ingredients = await Ingredient.find();
    res.json(ingredients);
})



app.listen(PORT, () => {
  console.log("Server is RUnning");
});

