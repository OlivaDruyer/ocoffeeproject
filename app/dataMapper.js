const client = require("./database");

const dataMapper = {
  getAllCoffees: async () => {
    const result = await client.query('SELECT * FROM "coffee"');
    const coffees = result.rows;
    return coffees;
  },

  getAllCategory: async () => {
    const result = await client.query('SELECT * FROM "category"');
    const categories = result.rows;
    return categories;
  },

  getACoffeeById: async (id) => {
    // { ... } || null
    const result = await client.query(
      `SELECT * FROM "coffee" WHERE "id" = $1;`,
      [id]
    );
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  },

  getThreeRandomCoffees: async () => {
    const result = await client.query(
      'SELECT * FROM "coffee" ORDER BY RANDOM() LIMIT 3'
    );
    const threecoffees = result.rows;
    return threecoffees;
  },

  async getCoffeesByCategory(categoryId) {
    const coffeesQuery = `SELECT c.*, ct.name as category_name 
  FROM "coffee" AS c
  JOIN category AS ct ON c.category_id = ct.id
  WHERE c.category_id= $1;`;
    const result = await client.query(coffeesQuery, [categoryId]);
    return result.rows;
  },
};

module.exports = dataMapper;
