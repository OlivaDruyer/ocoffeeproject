const client = require("./database");

class UserMapper {
    constructor(database) {
      this.database = database;
    }
  
    async findOneByEmail(email) {
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
  
      try {
        const result = await this.client.query(query, values);
        const userData = result.rows[0];
        if (userData) {
          return new User(userData.id, userData.email, userData.name);
        }
        return null;
      } catch (err) {
        console.error('Database query error:', err);
        throw err;
      }
    }
  }
  module.exports = UserMapper;