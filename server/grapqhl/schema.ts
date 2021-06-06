import { gql } from 'apollo-server-express';

export default gql`
    type User {
        _id: String,
        email: String,
        username: String,
        password: String,
        field: [String]
    }
    type TokenResponse {
        token: String
    }
    input LoginUserInput {
        email: String,
        password: String
    }
    input UserInput {
        username: String,
        email: String,
        field: [String],
        password: String
    }
    type Query {
        Users: [User]
    }
    type Mutation {
        signup(user: UserInput): TokenResponse
        login(user: LoginUserInput): TokenResponse
    }
    schema {
        query: Query,
        mutation: Mutation
    }
`