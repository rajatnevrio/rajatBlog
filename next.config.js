const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
    if (phase ===PHASE_DEVELOPMENT_SERVER){
        return {
            env: {
                mongodb_user: process.env.mongodb_user,
                mongodb_username: process.env.mongodb_username,
                mongodb_password: process.env.mongodb_password,
                mongodb_clustername: process.env.mongodb_clustername,
                mongodb_database: process.env.mongodb_database,
              },
        }
    }
  return {
    env: {
      mongodb_user: process.env.mongodb_user,
      mongodb_username: process.env.mongodb_username,
      mongodb_password: process.env.mongodb_password,
      mongodb_clustername: process.env.mongodb_clustername,
      mongodb_database: process.env.mongodb_database,
    },
  };
};
