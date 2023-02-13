const http = require("http");
const fs = require("fs"); //file system
const { json } = require("stream/consumers");

const port = 3000;
const users = [
  { name: "user1", email: "user1@gmail.com", age: 20 },
  { name: "user2", email: "user2@gmail.com", age: 40 },
  { name: "user3", email: "user3@gmail.com", age: 50 },
  { name: "user4", email: "user4@gmail.com", age: 60 },
  { name: "user5", email: "user5@gmail.com", age: 77 },
];
const server = http.createServer((request, response) => {
  const method = request.method;
  const route = request.url;
  const isRootUrl = route === "/";
  if (isRootUrl) {
    fs.readFile("index.html", (err, data) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    });
  } else if (route === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      response.writeHead(200, { "Content-Type": "text/javascript" });
      response.write(data);
      response.end();
    });
  } else if (route === "/users") {
    const isGet = method === "GET";
    const isPost = method === "POST";
    const isDelete = method === "DELETE";
    if (isGet) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(users));
    } else if (isPost) {
      let scriptData = "";
      request.on("data", (chunk) => {
        scriptData += chunk;
      });
      request.on("end", () => {
        const newUser = JSON.parse(scriptData);
        users.push(newUser);
      });
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(users));
      response.end();
    } else if (isDelete) {
      let filterUser;
      let acceptEmail = "";
      request.on("data", (chunk) => (acceptEmail += chunk));
      request.on("end", () => {
        const newAcceptEmail = JSON.parse(acceptEmail);
        const newEmail = newAcceptEmail.email;
        console.log(newEmail);
        filterUser = users.filter((element) => element.email !== newEmail);
        console.log(filterUser);
      });
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(filterUser));
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write("<h1>Nothing</h1>");
    }
    response.end();
  } else if (route === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(data);
      response.end();
    });
  } else {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Not home url");
    response.end();
  }
});

server.listen(port, () => {
  console.log(`Server started. Listening on port: ${port}`);
});
