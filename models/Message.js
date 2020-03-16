import { dbPool } from './dbPool';

export default class Message {
    constructor(content, user, pid, fromPatient, timestamp = undefined) {
        this.content = content;
        this.user = user;
        this.pid = pid;
        this.fromPatient = fromPatient;
        this.timestamp = timestamp;
    }

    async insertMessageIntoTable() {
        const fromPatientIntValue = this.fromPatient ? 1 : 0;
        const insertString = "INSERT INTO Texts (user, pid, from_patient, message) ";
        const valuesString = "VALUES ('" + this.user.username + "', '" + this.pid + "', '" + fromPatientIntValue + "', '" + this.content + "')"
        const queryString = insertString + valuesString;
        await dbPool.query(queryString);
    }
}