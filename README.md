#qBraid Chat - VS Code Extension 🚀 qBraid Chat is a VS Code extension that enables seamless interaction with qBraid’s quantum computing API. This extension allows users to chat with AI models, retrieve quantum devices, and manage quantum jobs—all within the VS Code environment.

🛠 Features ✔ qBraid Chat: Communicate with AI models via the qBraid API. ✔ Quantum Device Explorer: Fetch and view available quantum simulators & QPUs. ✔ Quantum Job Management: Submit and monitor quantum jobs directly from VS Code. ✔ API Key Authentication: Securely interact with qBraid’s API using your API key. ✔ Sleek UI with Bootstrap: A clean and intuitive interface for an enhanced user experience.

🔧 Requirements Ensure you have the following installed:

Visual Studio Code Node.js (Latest LTS recommended) qBraid API Key (Get one from qBraid Account) ⚙ Extension Settings This extension does not introduce new VS Code settings but requires an API key stored locally for authentication.

📥 Installation

-- Manual Installation Clone this repository: bash Copy git clone https://github.com/your-repo/qbraid-chat.git cd qbraid-chat Install dependencies: bash Copy npm install Package the extension: bash Copy npm run vsce:package Install the .vsix file: bash Copy code --install-extension qbraid-chat-0.1.0.vsix Start the extension: Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P on macOS). Search for qBraid Chat: Start and select it. 🚀 Usage Enter your API Key in the provided input field. Retrieve Quantum Devices by applying filters. Send Chat Messages to qBraid’s AI models.
