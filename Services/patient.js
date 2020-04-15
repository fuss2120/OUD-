import Patient from '../Models/Patient';

const createPatientWithFormData = async formData => {
    const firstName = formData.firstName;
    const lastName = formData.lastName;
    const phoneNumber = formData.phoneNumber;
    const pCategory = formData.pCategory;
    const comments = formData.comments;
    let patient = new Patient(firstName, lastName, phoneNumber, pCategory, comments);
    await patient.insertPatientToTable();
}

const getAllPatientsData = async () => {
    return await Patient.getAllPatientsData();
}

const getPatientNameFromPid = async pid => {
    return await Patient.getNameFromPid(pid);
}

const getPatientCategoryList = async () => {
    return await Patient.getCategoryList();
}

export default {
    createPatientWithFormData,
    getAllPatientsData,
    getPatientNameFromPid,
    getPatientCategoryList
}