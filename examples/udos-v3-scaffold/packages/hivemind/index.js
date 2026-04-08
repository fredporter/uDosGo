function processFeed(input) {
  return {
    tasks: [
      {
        id: "task-1",
        type: "create_note",
        status: "pending",
        input
      }
    ]
  };
}
module.exports = { processFeed };
