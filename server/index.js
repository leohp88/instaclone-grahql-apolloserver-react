const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");
require("dotenv").config({ path: "./.env" });

mongoose.connect(process.env.URI, (err, _) => {
  if (err) {
    console.log("Error de conexion");
  } else {
    server();
  }
});

function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
  });

  serverApollo.listen().then(({ url }) => {
    console.log("#####################################################");
    console.log(`Servidor listo en la url ${url}`);
    console.log("#####################################################");
  });
}
