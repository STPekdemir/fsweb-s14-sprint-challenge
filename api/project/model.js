// `Proje` modeli buraya
const db = require("../../data/dbConfig");
async function create(data) {
  const insertedData = await db("projects").insert(data);
  const dataFromDataBase = await db("projects")
    .where({
      project_id: insertedData[0],
    })
    .first();
  if (dataFromDataBase.project_completed === 0) {
    dataFromDataBase.project_completed = false;
  } else {
    dataFromDataBase.project_completed = true;
  }
  return dataFromDataBase;
}
async function fetch() {
  const data = await db("projects");
  const returndata = data.map((obj) => {
    return {
      ...obj,
      project_completed: obj.project_completed === 1 ? true : false,
    };
  });
  return returndata;
}
module.exports = { fetch, create };
