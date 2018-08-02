import * as assert from "assert";
import * as vscode from "vscode";
import HLinterCommon from "../hLinterCommon";

suite("hLInter Common", function() {
  test("Bad trailing white", async () => {
    const doc = await vscode.workspace.openTextDocument({
      language: "c",
      content: "Bad Test   "
    });
    await vscode.window.showTextDocument(doc);
    const hlinter_common = new HLinterCommon();
    assert.equal(false, hlinter_common.lint());
  });

  test("Good", async () => {
    const doc = await vscode.workspace.openTextDocument({
      language: "c",
      content: "\
Good Test\n\
      "
    });
    await vscode.window.showTextDocument(doc);
    const hlinter_common = new HLinterCommon();
    assert.equal(false, hlinter_common.lint());
  });
});
