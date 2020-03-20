import { dbPool } from './dbPool';
import Patient from './Patient';
import twilio from 'twilio';

const accountSid = 'AC5d9e67f4494b9e0fdf696723be301fd7';
const authToken =  'e9cdf2cbef581153b42d1536fd33a0dd';
const twilioClient = twilio(accountSid, authToken);

export default class Message {
    constructor(content, pid, fromPatient, user = undefined, timestamp = undefined) {
        this.content = content;
        this.user = user;
        this.pid = pid;
        this.fromPatient = fromPatient;
        this.timestamp = timestamp;
    }

    async sendMessage() {
        await this.sendMessageThroughTwilio();
        await this.insertMessageIntoTable();
    }

    async sendMessageThroughTwilio() {
        const patientPhoneNumber = await Patient.getPatientPhoneNumberFromPid(this.pid);
        await twilioClient.messages.create({
            body: this.content,
            from: '+12064663486',
            to: "+1" + patientPhoneNumber
        })
    }

    async insertMessageIntoTable() {
        if (!this.user) {
            this.insertMessageIntoTableWithoutUser();
            return;
        }
        const fromPatientIntValue = this.fromPatient ? 1 : 0;
        const insertString = "INSERT INTO Texts (user, pid, from_patient, message) ";
        const valuesString = "VALUES ('" + this.user.username + "', '" + this.pid + "', '" + fromPatientIntValue + "', '" + this.content + "')"
        const queryString = insertString + valuesString;
        await dbPool.query(queryString);
    }

    async insertMessageIntoTableWithoutUser() {
        const fromPatientIntValue = this.fromPatient ? 1 : 0;
        const insertString = "INSERT INTO Texts (pid, from_patient, message) ";
        const valuesString = "VALUES ('" + this.pid + "', '" + fromPatientIntValue + "', '" + this.content + "')"
        const queryString = insertString + valuesString;
        await dbPool.query(queryString);
    }

    static async getMessagesForPid(pid) {
        const query = "SELECT from_patient, message, time_sent FROM Texts WHERE pid = " + pid;
        const queryResults = await dbPool.query(query);
        return queryResults;
    }
}
