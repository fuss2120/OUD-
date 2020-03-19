import Message from '../models/Message';
import Patient from '../models/Patient';

const sendMessageFromUserToPid = async (messageText, user, pid) => {
    let message = new Message(messageText, pid, false, user);
    await message.sendMessage();
}

const logMessageFromPhoneNumber = async (messageText, phoneNumber) => {
    const pid = await Patient.getPidFromPhoneNumber(phoneNumber);
    let message = new Message(messageText, pid, true);
    await message.insertMessageIntoTable();
}

const getPatientMessagesFromPid = async pid => {
    return await Message.getMessagesForPid(pid);
}

export default { sendMessageFromUserToPid, logMessageFromPhoneNumber, getPatientMessagesFromPid }