import { Server, HttpBase, createServer, IncomingMessage, ServerResponse } from 'http';
import Redis from "ioredis";
import * as url from 'url';

let pub = new Redis(6379, "rediscache");
let count = 0;
function listener(req: IncomingMessage, res: ServerResponse) {
    const currentCount = ++count;
    const parsedUrl = url.parse(req.url || "No url", true);
    if (parsedUrl.query.req) {
        pub.publish("foo", (parsedUrl.query.req) + `:${currentCount}`);
        res.writeHead(204, `Thanks ${currentCount}`, { 'Content-Type': 'text/plain' });
    }
    else {
        count=0;
        res.writeHead(204, `Reset done`, { 'Content-Type': 'text/plain' });

    }
    res.end();
}

const server: Server = createServer(listener)
server.listen(3000);

