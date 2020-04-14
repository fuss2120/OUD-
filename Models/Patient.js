import { dbPool } from './dbPool';

const trimPhoneNumber = phoneNumber => {
    if (phoneNumber.length == 12 && phoneNumber[0] == '+')
        return phoneNumber.substring(2);
    return phoneNumber;
}

export default class Patient {
    constructor(firstName, lastName, phoneNumber, categoryId, comments) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.categoryId = categoryId;
        this.comments = comments;
    }

    async insertPatientToTable() {
        const insertString = "INSERT INTO Patients (first_name, last_name, phone_number, category_id, additional_comments) ";
        const valuesString = "VALUES ('" + this.firstName + "', '" + this.lastName + "', '" + this.phoneNumber + "', '" + this.categoryId + "', '" + this.comments + "')"
        const queryString = insertString + valuesString;
        await dbPool.query(queryString);
    }

    static async getAllPatientsData() {
        const queryString = "SELECT p.*, c.category FROM Patients p LEFT JOIN Patient_Categories c ON p.category_id = c.id";
        return await dbPool.query(queryString);
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

    static async getNameFromPid(pid) {
        const queryResults = await dbPool.query("SELECT first_name, last_name FROM Patients WHERE pid = " + pid);
        const firstName = queryResults[0]['first_name'];
        const lastName = queryResults[0]['last_name'];
        const fullName = firstName + " " + lastName;
        return fullName;
    }

    static async getCategoryList() {
        const queryResults = await dbPool.query("SELECT * FROM Patient_Categories");
        return queryResults;
    }
}