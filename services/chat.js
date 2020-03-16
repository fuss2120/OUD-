import Message from '../models/Message';

const sendMessageFromUserToPid = async (messageText, user, pid) => {
    let message = new Message(messageText, user, pid, false);
    await message.insertMessageIntoTable();
}

export default { sendMessageFromUserToPid }