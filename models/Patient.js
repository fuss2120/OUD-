import { dbPool } from './dbPool';

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
}