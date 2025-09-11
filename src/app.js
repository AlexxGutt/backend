const http = require("http");
const url = require("url");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const query = parsedUrl.query;

  if ("hello" in query) {
    if (query.hello && query.hello.trim() !== "") {
      response.writeHead(200, {
        "Content-Type": "text/plain",
      });
      response.write(`Hello, ${query.hello}.`);
    } else {
      response.writeHead(400, {
        "Content-Type": "text/plain",
      });
      response.write("Enter a name");
    }
    response.end();
    return;
  }

  if ("users" in query) {
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.write(getUsers());
    response.end();
    return;
  }

  if (Object.keys(query).length === 0) {
    response.writeHead(200, {
      "Content-Type": "text/plain",
    });
    response.write("Hello, World!");
    response.end();
    return;
  }

  response.writeHead(500);
  response.end();
});

const port = process.env.PORT || 3003;
server.listen(port, () => {
  console.log(`Сервер запущен!!! по адресу http://127.0.0.1:${port}`);
});
