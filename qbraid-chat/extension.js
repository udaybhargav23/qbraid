const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
    let disposable = vscode.commands.registerCommand('qbraid-chat.start', function () {
        const panel = vscode.window.createWebviewPanel(
            'qbraidChat',
            'qBraid Chat',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(context.extensionPath, 'webview', 'build'))
                ]
            }
        );

        const appPath = path.join(context.extensionPath, 'webview', 'build', 'index.html');
        console.log("🔍 WebView is trying to load:", appPath);

        if (!fs.existsSync(appPath)) {
            console.error("❌ ERROR: index.html NOT FOUND!");
            panel.webview.html = "<h1>❌ ERROR: React App Not Found. Run 'npm run build' inside webview/</h1>";
            return;
        }

        let html = fs.readFileSync(appPath, 'utf8');

        html = html.replace(
            /<head>/,
            `<head>
                <meta http-equiv="Content-Security-Policy" content="
                    default-src 'self' vscode-resource: https://*.vscode-cdn.net data:;
                    img-src vscode-resource: data:;
                    style-src 'self' vscode-resource: 'unsafe-inline';
                    script-src 'self' vscode-resource: 'unsafe-inline' 'unsafe-eval';
                    connect-src 'self' https://api.qbraid.com;
                    font-src 'self' vscode-resource: https://*.vscode-cdn.net;
                ">
                <base href="${panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'webview', 'build')))}/">
            `
        );

        panel.webview.html = html;
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
