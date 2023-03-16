import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";

const db = await dbRtns.getDBInstance();
const resolvers = {
  // name: String
  // teamName: String
  // productName: String
  // startDate: String
  // hoursPerPoint: Int
  // estimatedPoint: Int
  // estimatedCost: Int
  addproject: async (args) => {
    let project = {
      name: args.name,
      teamName: args.teamName,
      productName: args.productName,
      startDate: args.startDate,
      hoursPerPoint: args.hoursPerPoint,
      estimatedPoint: args.estimatedPoint,
      estimatedCost: args.estimatedCost,
    };
    let results = await dbRtns.addOne(db, cfg.PROJECTCOLLECTION, project);
    return results.acknowledged ? project : null;
  },
  projects: async () => {
    return await dbRtns.findAll(db, cfg.PROJECTCOLLECTION, {}, {});
  },
};
export { resolvers };
