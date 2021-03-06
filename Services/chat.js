import Message from '../Models/Message';
import Patient from '../Models/Patient';
import { Server } from 'ws';

/**
 * WebSocket Server initilization
 */
let chatSocketServer;
const initilizeSocketServer = (server) => {
    chatSocketServer = new Server({ server: server });
}

const broadcastTextFromPid = pid => {
    chatSocketServer.clients.forEach(client => {
        const messageToSend = JSON.stringify({ pid: pid });
        client.send(messageToSend);
    })
}

const sendMessageFromUserToPid = async (messageText, user, pid) => {
    let message = new Message(messageText, pid, false, user);
    await message.sendMessage();
}

const logMessageFromPhoneNumber = async (messageText, phoneNumber) => {
    const pid = await Patient.getPidFromPhoneNumber(phoneNumber);
    let message = new Message(messageText, pid, true);
    await message.insertMessageIntoTable();
    broadcastTextFromPid(pid);
}

const getPatientMessagesFromPid = async pid => {
    return await Message.getMessagesForPid(pid);
}

const sendTextToCategoryIdFromUser = async (message, categoryId, user) => {
    const patientIdsInCategory = await Patient.getPatientIdsInCategory(categoryId);
    for (let pid of patientIdsInCategory)
        sendMessageFromUserToPid(message, user, pid);
}

export default {
    sendMessageFromUserToPid,
    logMessageFromPhoneNumber,
    getPatientMessagesFromPid,
    initilizeSocketServer,
    sendTextToCategoryIdFromUser
}