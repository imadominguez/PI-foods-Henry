const { Typediet } = require("../db");
const preDietsList = [
  { name: "gluten free" },
  { name: "ketogenic" },
  { name: "vegetarian" },
  { name: "dairy free" },
  { name: "lacto ovo vegetarian" },
  { name: "vegan" },
  { name: "pescetarian" },
  { name: "paleolithic" },
  { name: "primal" },
  { name: "low fodmap" },
  { name: "whole 30" },
];
const getDiets = async () => {
  let findDietDb = await Typediet.findAll();
  if (findDietDb.length === 0) {
    Typediet.bulkCreate(preDietsList);
    findDietDb = await Typediet.findAll();
  }
  return findDietDb;
};

module.exports = { getDiets };
