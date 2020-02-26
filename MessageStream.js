import Message from './Message';

export default class MessageStream {
    constructor(adminID, patientID) {
        this.adminID = adminID;
        this.patientID = patientID;
        this.messages = [];
    }

    sendAdminMessage(messageContent) {
        let newMess = new Message(this.adminID, this.patientID, messageContent, Date.now());
        this.messages.push(newMess);
    }
}