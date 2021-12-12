const userController = require("../controller/user");
const resolver = {
  Query: {
    //User
    getUser: () => {
      console.log("Obteniendo usuarios");
      return null;
    },
  },

  Mutation: {
    //User
    register: (_, { input }) => userController.register(input),

    login: (_, { input }) => userController.login(input),
  },
};

module.exports = resolver;
