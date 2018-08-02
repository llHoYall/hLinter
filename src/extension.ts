'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "hlinter" is now active!');

    let disposable = vscode.commands.registerCommand('hLinter.Lint', () => {
        vscode.window.showInformationMessage("HoYa's Linter!");
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}