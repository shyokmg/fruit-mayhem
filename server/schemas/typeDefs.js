const typeDefs = `

type User {
    _id: ID
    username: String
    email: String
    password: String
    playerData: [PlayerData]
}

type PlayerData {
    level: Int
    highScore: Int
    unlocked: Boolean
}

input PlayerDataInput {
    level: Int
    highScore: Int
    unlocked: Boolean
}

type Level {
    level: Int
    numberOfObjects: [NumberOfObject]
}

type NumberOfObject {
    fruits: Int
    powerUps: Int
    hazards: Int
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    getLevel(level: Int): Level
} 

type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, playerData: PlayerDataInput): Auth
    saveScore(maxLevel: Int, level: Int, highScore: Int, unlocked: Boolean ): User
}
`;

module.exports = typeDefs;