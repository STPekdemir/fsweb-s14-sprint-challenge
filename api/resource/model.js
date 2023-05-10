// `Resource` modeli buraya
const db = require("../../data/dbConfig");
function create(data) {
  return db("resources")
    .insert(data)
    .then((ids) => {
      return db("resources").where({ resource_id: ids[0] }).first();
    });
}
function fetch() {
  return db("resources");
}
module.exports = {
  create,
  fetch,
};
