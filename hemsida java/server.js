const { createServer } = require("http");
const { createReadStream } = require("fs");
const { decode } = require("querystring");

const sendFile = (response, status, type, filePath) => {
  response.writeHead(status, {"Content-Type": type });
  createReadStream(filePath).pipe(response);
 };

 createServer((request, response) => {
  if(request.method === "POST") {
    let body = "";
    request.on("data", data => {
      body += data;
    })
    request.on("end", () => {
      const {name, mail, pass } = decode(body);
      console.log(`${name} (${mail}): ${pass}`);
    });
  }
     switch (request.url) {
         case "/":
             return sendFile(response, 200, "text/html", "./home.html");
         case "/jag.jpg":
        return sendFile(response, 200, "image/jpg", "./jag.jpg");
         case "/styles.css":
             return sendFile(response, 200, "text/css", "./styles.css");
        case "/form.html":
            return sendFile(response, 200, "text/html", "./form.html");
         default: return sendFile(response, 200, "text/html", "./404.html");
     }
 }).listen(3020);

console.log("SHORBA");