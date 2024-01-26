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

type HighScore {
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

input SaveScoreInput {
    level: Int
    highScore: Int
    unlocked: Bool
}

type Query {
    me: User
    getLevel(level: Int): Level
} 

type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    saveScore(
        maxLevel: Int
        highScores: SaveScoreInput
    ): Player
}
`;

module.exports = typeDefs;