// Require config middleware for db configurations
const config = require('./middleware/config');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// Export development variables.
module.exports = {
  development: config.db
};
