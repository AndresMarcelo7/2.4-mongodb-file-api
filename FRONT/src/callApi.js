const axios = require("axios");

function callTasks() {
  /*let url =
    "https://taskplannerapifunctions.azurewebsites.net/api/list-tasks?code=CT2iqiLtmFZSgGaN4kz5a1gDq4lU1EJFABDzIar63LaNgoS0ZAQcrw==";
  axios
    .get(url)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
    */
}

function postTask(data) {
  /*
  let url =
    "https://taskplannerapifunctions.azurewebsites.net/api/add-task?code=3m2heLFvHlHT1Pkd96vCZaWRzDuKFi0knGj4lbvgn4nzt/rMb8GFtQ==";
  axios.post(url, data).then(function (response) {
    alert("the task was Posted! :D  with ID: " + response.data.response.id);
    console.log(response);
  });
  */
}

module.exports = {
  callTasks: callTasks,
  postTask: postTask,
};
