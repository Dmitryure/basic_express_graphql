const graphql = require("graphql");
const {find} = require("lodash")
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphql;

const users = [ {id: '1', firstName:'vasya', age:20}, {id: '2', firstName:'petya', age:50} ]

const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: userType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return find(users, {id: args.id})
      }
    },
  },
});

module.exports = new GraphQLSchema({
    query: RootQuery
})