import Redis from "ioredis";


export class EventSubscriber {
    async init() {
        let client = new Redis("rediscache");
        await client.subscribe("foo");//.then(p => console.log("sub",p));
        client.on("message", this.handleSubscription);
        console.log("init done");
    }
    constructor() {
        
        Promise.resolve()
        .then(p => this.init())
    }
    
    handleSubscription(channel: string, message: string) {
        console.log("sub", channel, message);
    }
}

const app = new EventSubscriber();