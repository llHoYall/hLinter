"use strict";

import * as vscode from "vscode";
import Window = vscode.window;
import Workspace = vscode.workspace;
import StatusBarItem = vscode.StatusBarItem;
import StatusBarAlignment = vscode.StatusBarAlignment;
import HLinterCommon from "./hLinterCommon";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "hLinter" is now active!');

  const hlinter = new HLinter();
  hlinter.lint();

  let disposable = vscode.commands.registerCommand("hLinter.Lint", () => {
    hlinter.lint();
  });
  context.subscriptions.push(disposable);

  Window.onDidChangeActiveTextEditor(() => {
    hlinter.lint();
  });

  Workspace.onDidChangeTextDocument(() => {
    hlinter.lint();
  });
}

export function deactivate() {}

class HLinter {
  private _statusBarItem: StatusBarItem = Window.createStatusBarItem(
    StatusBarAlignment.Right
  );

  public lint() {
    const editor = Window.activeTextEditor;
    if (!editor) {
      this._statusBarItem.hide();
      return;
    }

    const hlinter_common = new HLinterCommon();
    let status = hlinter_common.lint();
    this._statusBarItem.text =
      status === true ? `hLinter (C): $(check)` : `hLinter (C): $(x)`;
    this._statusBarItem.show();
  }

  dispose() {
    this._statusBarItem.dispose();
  }
}
