const dataMapper = require("../dataMapper.js");

const mainController = {
  // méthode pour la page d'accueil
  async homePage(req, res) {
    try {
      const threecoffees = await dataMapper.getThreeRandomCoffees();
      res.render("pages/home", { threecoffees });
    } catch (error) {
      console.error(error);
      response.send("error");
    }
  },

  async catalogPage(req, res) {
    try {
        const threecoffees = await dataMapper.getThreeRandomCoffees();
        const category = parseInt(req.params.id);
        const allCategory = await dataMapper.getAllCategory();
      res.render("pages/catalog", { threecoffees , allCategory });
      }
    catch (error) {
      console.error(error);
      res.status(500).render("error/500");
   }
  },

  async searchPage(req, res) {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        throw new Error("Invalid category ID");
      }
  
      const coffeesByCategory = await dataMapper.getCoffeesByCategory(categoryId);
  
      if (coffeesByCategory.length === 0) {
        throw new Error("Category not found or no coffees in this category");
      }
  
      // Assuming all coffees have the same category_name, use the first one.
      const categoryName = coffeesByCategory[0].category_name;
  
      // Render the view with both coffees and category name
      res.render("pages/searchresult", { category: categoryName, coffeesByCategory });
    } catch (error) {
      console.error(error);
      res.status(500).render("error/500");
    }
  },

async articlesPage(req, res, next) {
    try {
      const coffees = await dataMapper.getAllCoffees();
      res.render("pages/articles", { coffees });
    } catch (error) {
      console.error(error);
      res.status(500).render("error/500");
    }
  },

  async articlePage(req, res, next) {
    try {
      const coffeeId = parseInt(req.params.id);
      const coffee = await dataMapper.getACoffeeById(coffeeId);
      if (!coffee) {
        next(error);
      } else {
        res.render("pages/article", { coffee });
      }
    } catch (error) {
      console.error(error);
      res.status(500).render("error/500");
    }
  },

  shopPage(req, res) {
    res.render("pages/shop");
  }

}

module.exports = mainController;
