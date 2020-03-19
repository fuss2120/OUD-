import { dbPool } from './dbPool';

const trimPhoneNumber = phoneNumber => {
    if (phoneNumber.length == 12 && phoneNumber[0] == '+')
        return phoneNumber.substring(2);
    return phoneNumber;
}

export default class Patient {
    constructor(firstName, lastName, phoneNumber, comments) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.comments = comments;
    }

    async insertPatientToTable() {
        const insertString = "INSERT INTO Patients (first_name, last_name, phone_number, additional_comments) ";
        const valuesString = "VALUES ('" + this.firstName + "', '" + this.lastName + "', '" + this.phoneNumber + "', '" + this.comments + "')"
        const queryString = insertString + valuesString;
        await dbPool.query(queryString);
    }

    static async getAllPatientsData() {
        return await dbPool.query("SELECT * FROM Patients");
    }

    static async getPatientPhoneNumberFromPid(pid) {
        const queryResults = await dbPool.query("SELECT phone_number FROM Patients WHERE pid = " + pid);
        return queryResults[0]['phone_number'];
    }

    static async getPidFromPhoneNumber(phoneNumber) {
        phoneNumber = trimPhoneNumber(phoneNumber);
        const queryResults = await dbPool.query("SELECT pid FROM Patients WHERE phone_number = '" + phoneNumber + "'");
        return queryResults[0]['pid'];
    }
}