// const app = require("express")();
// app.use(require("cors")());
// 
// const fetch = require("node-fetch");
// 
// app.get("/", (request, response) => {
// 	response.writeHead(200, { "Content-Type": "application/json" });
// 	fetch("https://tatoeba.org/en/api_v0/search" + request.url.substring(request.url.indexOf("?")))
// 		.then(response => response.text())
// 		.then(body => {
// 			response.write(body);
// 			response.end();
// 		});
// });
// 
// app.listen(3000);

const fetch = require("node-fetch");

module.exports = async (request, response) => {
    response.setHeader("Content-Type", "application/json");

    try {
        const result = await fetch("https://tatoeba.org/en/api_v0/search" + request.url.substring(request.url.indexOf("?")));
        const body = await result.text();

        response.status(200).send(body);
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal Server Error");
    }
};
