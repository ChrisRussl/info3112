const schema = `
type Query {
 projects: [Project]
 },
 type Mutation {
addproject( name:String, teamName: String, productName: String, startDate: String, hoursPerPoint: Int, estimatedPoint: Int, estimatedCost: Int): Project
} 
type Project {
    _id:String
name: String
teamName: String
productName: String
startDate: String
hoursPerPoint: Int
estimatedPoint: Int
estimatedCost: Int
},

`;
export { schema };
