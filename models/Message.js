export default class Message {
    constructor(from, to, content, timestamp) {
        this.from = from;
        this.to = to;
        this.content = content;
        this.timestamp = timestamp;
    }
}