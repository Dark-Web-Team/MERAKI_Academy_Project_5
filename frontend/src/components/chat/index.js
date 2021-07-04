import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;
const CONNECTION_PORT = 'http://localhost:5000';

socket = io(CONNECTION_PORT);

function Chat ({roomId , userId}) {
	const [message, setMessage] = useState('');
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		socket = io(CONNECTION_PORT);
        socket.emit('join_room', roomId);
	}, [CONNECTION_PORT]);

	socket.on('receive_message', (data) => {
		setMessageList([...messageList, data]);
	});

	// useEffect(() => {}, [messageList]);

	

	const sendMessage = () => {
		const messageContent = {
			roomId,
			content: {
				author: userId,
				message,
			},
		};

		socket.emit('send_message', messageContent); //raise event
		setMessageList([...messageList, messageContent.content]);
		setMessage('');
	};

	return (
		<>
					<div>
						{messageList.map((val, i) => {
							return (
								<h1 key={i}>
									{val.author} {val.message}
								</h1>
							);
						})}
					</div>
					<div>
						<input
							type="text"
							placeholder="Write your message here ..."
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button onClick={sendMessage}>Send</button>
					</div>
				</>
		
	);
}

export default Chat;
