import React, { useState } from 'react';
import { useLazyGetModelsQuery, useSendMessageMutation } from '../api/chatApi';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/ChatBox.css'; // Custom styles for better UI

const ChatBox = () => {
    const [apiKey, setApiKey] = useState(localStorage.getItem('qbraidApiKey') || '');
    const [selectedModel, setSelectedModel] = useState('');
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);

    const [getModels, { data: models = [], isFetching }] = useLazyGetModelsQuery();
    const [sendMessage] = useSendMessageMutation();

    // Function to Fetch Models
    const handleGetModels = () => {
        if (!apiKey) {
            alert("Please enter your API key!");
            return;
        }
        getModels();
    };

    // Function to Send Chat Message
    const handleSendMessage = async () => {
        if (!message.trim()) {
            alert("Please select a model and enter a message!");
            return;
        }

        setChatLog((prev) => [...prev, { role: "user", content: message }]);

        try {
            const response = await sendMessage({ prompt: message, model: selectedModel }).unwrap();
            console.log("🔍 Full API Response:", response);

            // Add bot response
            setChatLog((prev) => [...prev, { role: "bot", content: response?.content || "No response from bot" }]);
        } catch (error) {
            console.error("❌ API Error:", error);
            setChatLog((prev) => [...prev, { role: "bot", content: "Error: Failed to send message" }]);
        }

        setMessage('');
    };

    return (
        <div className="container chat-container">
            <h2 className="text-center text-light">qBraid Chat</h2>

            {/* API Key Input */}
            <div className="mb-3">
                <label htmlFor="apiKey" className="form-label text-light">Enter API Key:</label>
                <input
                    type="text"
                    id="apiKey"
                    className="form-control"
                    placeholder="Enter your qBraid API key"
                    value={apiKey}
                    onChange={(e) => {
                        setApiKey(e.target.value);
                        localStorage.setItem('qbraidApiKey', e.target.value);
                    }}
                />
            </div>

            {/* Fetch Models Button */}
            <div className="mb-3">
                <button className="btn btn-success w-100" onClick={handleGetModels} disabled={isFetching}>
                    {isFetching ? "Fetching..." : "Get Available Models"}
                </button>
            </div>

            {/* Model Selection Dropdown */}
            {models.length > 0 && (
                <div className="mb-3">
                    <label className="form-label text-light">Select a Model:</label>
                    <select
                        className="form-select"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                    >
                        <option value="">Choose Model</option>
                        {models.map((modelData, index) => (
                            <option key={index} value={modelData.model}>
                                {modelData.model}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Chat History */}
            <div className="chat-box border rounded p-3 mb-3">
                {chatLog.map((log, index) => (
                    <div key={index} className={`chat-message ${log.role}`}>
                        <span>{log.content}</span>
                    </div>
                ))}
            </div>

            {/* Message Input Field */}
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={!apiKey}
                />
                <button className="btn btn-primary" onClick={handleSendMessage} disabled={!apiKey}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
