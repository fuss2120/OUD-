import Patient from '../models/Patient';

const createPatientWithFormData = async formData => {
    const firstName = formData.firstName;
    const lastName = formData.lastName;
    const phoneNumber = formData.phoneNumber;
    const comments = formData.comments;
    let patient = new Patient(firstName, lastName, phoneNumber, comments);
    await patient.insertPatientToTable();
}

export default { createPatientWithFormData }