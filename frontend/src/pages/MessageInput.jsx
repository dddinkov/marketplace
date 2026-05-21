import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
    const [receiver, setReceiver] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!receiver || !content) return;
        onSend(receiver, content);
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Receiver"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
            />
            <input
                placeholder="Message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageInput;