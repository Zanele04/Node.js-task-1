const http = require('http');
const fs = require('fs');

const readData = () => {
    return JSON.parse(fs.readFileSync('data.json', 'utf8'));
};

const writeData = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
};

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let [_, endpoint, id] = req.url.split('/');
    id = id ? parseInt(id) : null;
    let data = readData();

    if (["movies", "series", "songs"].includes(endpoint)) {
        switch (req.method) {
            case "GET":
                res.end(JSON.stringify(data[endpoint]));
                break;
            case "POST":
                let body = "";
                req.on("data", chunk => body += chunk);
                req.on("end", () => {
                    const newItem = JSON.parse(body);
                    newItem.id = data[endpoint].length + 1;
                    data[endpoint].push(newItem);
                    writeData(data);
                    res.end(JSON.stringify(data[endpoint]));
                });
                break;
            case "PUT":
                if (!id) return res.end(JSON.stringify({ error: "ID required" }));
                let updateBody = "";
                req.on("data", chunk => updateBody += chunk);
                req.on("end", () => {
                    const updatedItem = JSON.parse(updateBody);
                    data[endpoint] = data[endpoint].map(item => item.id === id ? { ...item, ...updatedItem } : item);
                    writeData(data);
                    res.end(JSON.stringify(data[endpoint]));
                });
                break;
            case "DELETE":
                if (!id) return res.end(JSON.stringify({ error: "ID required" }));
                data[endpoint] = data[endpoint].filter(item => item.id !== id);
                writeData(data);
                res.end(JSON.stringify(data[endpoint]));
                break;
            default:
                res.writeHead(405);
                res.end(JSON.stringify({ error: "Method not allowed" }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Not found" }));
    }
});

server.listen(3000, () => console.log("Server running on port 3000"));
