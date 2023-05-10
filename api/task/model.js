// bu`Task` modeli buraya
const db = require("../../data/dbConfig");
async function create(data) {
  const insertedData = await db("tasks").insert(data);
  const dataFromDataBase = await db("tasks")
    .where({
      task_id: insertedData[0],
    })
    .first();
  if (dataFromDataBase.task_completed === 0) {
    dataFromDataBase.task_completed = false;
  } else {
    dataFromDataBase.task_completed = true;
  }
  return dataFromDataBase;
}
async function fetch() {
  const data = await db("tasks as ts")
    .leftJoin("projects as pj", "pj.project_id", "ts.project_id")
    .select(
      "ts.task_id",
      "ts.task_description",
      "ts.task_notes",
      "ts.task_completed",
      "pj.project_name",
      "pj.project_description"
    );
  const returndata = data.map((obj) => {
    return {
      ...obj,
      task_completed: obj.task_completed === 1 ? true : false,
    };
  });
  return returndata;
}
module.exports = { fetch, create };
