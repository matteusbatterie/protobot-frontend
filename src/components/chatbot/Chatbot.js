import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import appconfig from '../../appconfig';
import Message from './Message';

const api = config.api.URL;

const Chatbot = (props) => {
    let _input = {};
    let _messagesEnd = {};

    const [messages, setMessages] = useState([]);

    const apiUrl = appconfig.keys['APIURL'];

    const df_text_query = async (textQuery) => {
        let says = {
            speaks: 'me',
            message: {
                text: textQuery
            }
        };

        const response = await axios.post(`${apiUrl}/df_text_query`, { textQuery });

        var msgs = response.data.fulfillmentMessages.map((message) => ({
            speaks: 'bot',
            message: message.text
        }));

        setMessages([...messages, says, ...msgs]);
    };

    const df_event_query = async (eventQuery) => {
        const response = await axios.post(`${apiUrl}/df_event_query`, { eventQuery });

        var msgs = response.data.fulfillmentMessages.map((message) => ({
            speaks: 'bot',
            message: message.text
        }));

        setMessages([...messages, ...msgs]);
    };

    // componentDidMount
    useEffect(() => {
        df_event_query('Welcome');
    }, []);

    // componentDidUpdate
    useEffect(() => {
        _messagesEnd.scrollIntoView({ behavior: 'smooth' });
        _input.focus();
    }, [messages]);

    const renderMessage = (stateMessages) => {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return <Message
                    key={i}
                    speaks={message.speaks}
                    text={message.message.text} />
            });
        }

        return null;
    };

    const _handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            df_text_query(event.target.value);
            event.target.value = '';
        }
    };

    return (
        <div style={{ height: 400, width: 400, float: 'right' }}>
            <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                <h2>Chatbot</h2>
                {renderMessage(messages)}

                <div ref={(element) => { _messagesEnd = element; }}
                    style={{ float: 'left', clear: 'both' }}>
                </div>
                <input ref={(input) => { _input = input; }}
                    autoFocus={true}
                    type="text"
                    onKeyPress={_handleInputKeyPress} />
            </div>
        </div >
    );
}

export default Chatbot;
