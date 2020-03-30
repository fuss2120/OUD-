import MessageStream from './MessageStream';

test('Create a brand new, empty message stream', () => {
    let newStream = new MessageStream('a101', 'p4');
    expect(newStream.messages.length).toBe(0);
});

test('Create a new message stream and send two messages', () => {
    let newStream = new MessageStream('a88', 'p99');
    newStream.sendAdminMessage('First message');
    newStream.sendAdminMessage('Second message');
    expect(newStream.messages.length).toBe(2);
    expect(newStream.messages[0].content).toBe('First message');
    expect(newStream.messages[1].content).toBe('Second message');
})