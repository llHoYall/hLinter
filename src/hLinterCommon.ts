"use strict";

import * as vscode from "vscode";
import Window = vscode.window;
import DecorationOptions = vscode.DecorationOptions;

export default class HLinterCommon {
  public lint() {
    let status = true;
    if (!this._checkTrailingWhitespace()) {
      status = false;
    }
    return status;
  }

  private _checkTrailingWhitespace(): boolean {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
      return false;
    }

    let status = true;
    const doc = editor.document;
    const text = doc.getText();
    const regex = /[ \t]+(?=[\n\r]*)/g;
    const decoBgRed = Window.createTextEditorDecorationType({
      backgroundColor: "rgba(255, 0, 0, 0.3)"
    });
    let normalDecoration = vscode.window.createTextEditorDecorationType(<
      vscode.DecorationRenderOptions
    >{
      backgroundColor: "rgba(0, 0, 0, 0.3)"
    });
    let match;
    const trailing_whitespaces: DecorationOptions[] = [];
    while ((match = regex.exec(text))) {
      const start = doc.positionAt(match.index);
      const end = doc.positionAt(match.index + match[0].length);
      const range = { range: new vscode.Range(start, end) };
      trailing_whitespaces.push(range);
      status = false;
    }
    editor.setDecorations(normalDecoration, trailing_whitespaces);
    editor.setDecorations(decoBgRed, trailing_whitespaces);
    return status;
  }
}
