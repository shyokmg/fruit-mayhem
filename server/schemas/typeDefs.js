const typeDefs = `

type User {
    _id: ID
    username: String
    email: String
    password: String
    playerData: [Player]
}

type Player {
    maxLevel : Int
    highScores: [HighScore]

}

type PlayerData {
    level: Int
    highScore: Int
    unlocked: Bool
}

input PlayerDataInput {
    level: Int
    highScore: Int
    unlocked: Bool
}

type Level {
    level: Int
    numberOfObjects: [NumberOfObject]
}

type NumberOfObject {
    fruits: Int
    powerUps: Int
    hazards: INt
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
    saveScore(maxLevel: Int, level: Int, highScore: Int, unlocked: Bool ): User
}
`;

module.exports = typeDefs;