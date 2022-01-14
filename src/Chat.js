import React, { Component } from 'react';
import './Chat.css';
export default class Chat extends Component {
  constructor(props) {
    super(props);
    /**
     * We create an array of random response
     */
    this.automaticResponsePool = [
      `Ouai, c'est pas faux...`,
      'Ah ouai ?',
      '...',
      `Ouai, c'est sur`,
      'Hum...'
    ];
    /**
     * Pick a random response from the array
     */
    this.getRandomResponse = () => {
      return this.automaticResponsePool[Math.floor(Math.random() * this.automaticResponsePool.length)]
    };
    this.state = {
      currentMessage: '',
      messages : []
    };
    /**
     * Handle the data input and store the string in the currentMessage state
     * @param {Object} event 
     */
    this.handleChange = (event) => {
      this.setState({...this.state, currentMessage: event.target.value});
    };
   /**
     * Store a new message in the state
     * @param {string} content 
     * @param {boolean} senderIsOp 
     */
    this.pushMessage = (content, senderIsOp) => {
      const now = new Date();
      this.setState({
        currentMessage: '',
        messages: [
          ...this.state.messages,
          {
            uid: Math.random(),
            sentAt: now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            content,
            senderIsOp
          }
        ]
      });
    }
    /**
     * The enter key has been pressed, send the message
     * Then send an automatic response 1000ms (1s) later
     * @param {Object} event 
     */
    this.sendMessage = (event) => {
      if (event.key === 'Enter') { 
        this.pushMessage(this.state.currentMessage, true);
        setTimeout(() => {
          this.pushMessage(this.getRandomResponse(), false);
        }, 1000);
      };
    };
  };
  render() {
    return (
      <div className="chat-wrapper">
      <ul className="messages">
          {
            this.state.messages.map((message) => {
              return (
                <li
                  className={
                    [
                      'message-wrapper',
                      message.senderIsOp ? 'message-op' : 'message-remote'
                    ].join(' ')
                  }
                  key={message.uid}
                >
                  <span className="message-content">{message.content}</span>
                  <span className="message-sent-at">{message.sentAt}</span>
                </li>
              );
            })
          }
        </ul>
        <div className="input-wrapper">
          <input

            type="text"
            placeholder="Envoyer un message"
            value={this.state.currentMessage
            onChange={this.handleChange}
            onKeyPress={this.sendMessage}
          />
        </div>
      </div>
    );
  };
};
