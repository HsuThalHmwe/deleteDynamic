const app = document.getElementById("main");

const updateUser = (event) => {
  console.log(event.target.id);
};

const deleteUser = async (event) => {
  const emailDelete = event.target.id;
  const deleteEmailObj = {
    email: emailDelete,
  };
  const response = await fetch("http://localhost:3000/users", {
    method: "DELETE",
    body: JSON.stringify(deleteEmailObj),
  });
  console.log(response);
  const newacceptData = await response.json();
  app.innerHTML = "";
  createUserElwment(newacceptData);
};
const createNewUser = async () => {
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const age = document.querySelector("#age").value;
  const newUser = { name: username, email: email, age: age };
  console.log(newUser);
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(newUser),
  });
};

const createUserElwment = (users) => {
  const container = document.createElement("div");
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `
    <div class ="spanClass" style ="">
    <span>${user.name}</span>
    <span>${user.email}</span>
    <span>${user.age}</span>
    <button id="${user.email}" class="btn btn-danger" onclick="deleteUser(event)">Delete</button>
    <button id="${user.email}" class="btn btn-primary" onclick="updateUser(event)">Update</button>
    </div>`;
    container.append(userDiv);
  }
  app.append(container);
};
const fetchData = async () => {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  console.log("Data from", data);
  createUserElwment(data);
};
fetchData();
