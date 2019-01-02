'use strict';

import * as vscode from 'vscode';
import * as os from 'os';

export function activate(context: vscode.ExtensionContext) {
  // output
  const channel = vscode.window.createOutputChannel('tcl outline');
  const tclOutline = new TclOutline(channel);
  const tclOutlineUnsorted = vscode.commands.registerCommand('extension.tclOutlineUnsorted', () => {
    
    tclOutline.parseCurrentFile(false);
    
  });
  context.subscriptions.push(tclOutlineUnsorted);

  const tclOutlineSorted = vscode.commands.registerCommand('extension.tclOutlineSorted', () => {
    
    tclOutline.parseCurrentFile(true);
    
  });
  context.subscriptions.push(tclOutlineSorted);

}

// this method is called when your extension is deactivated
export function deactivate() {
}

class TclOutline {
  private channel: vscode.OutputChannel;
  constructor (ch: vscode.OutputChannel) {
    this.channel = ch;
  }
  parseCurrentFile (sorted: boolean) {
    const text = vscode.window.activeTextEditor.document.getText();

    
    const procReg = new RegExp('^\s*proc (.*)');
    const procFoundList = [];
    // parse text for proc
    let foundCount = 0, lineNum = 0;
    for (let line of text.split('\n')) {
      lineNum++;
      const procFound = procReg.exec(line);
      if (procFound !== null) {
        foundCount++;
        const u = vscode.window.activeTextEditor.document.uri.path;
        let lineNumIndicator = ':';
        if (/^win/.test(os.platform())) {
          lineNumIndicator = '#';
        }
        const anchor = `${vscode.window.activeTextEditor.document.uri}${lineNumIndicator}${lineNum}`;
        // channel.appendLine(anchor);
        let foundStr = procFound[1];
        if (foundStr !== '' && foundStr.substr(foundStr.length-1, 1) === '{') {
          foundStr = foundStr.slice(0, -1);
        }
        procFoundList.push(foundStr + ' -- ' + anchor + '\n');
      }
    }

    if (sorted) {
      procFoundList.sort();
    }

    // write to output
    this.channel.clear();
    this.channel.show(true);
    for (let resLine of procFoundList) {
      this.channel.appendLine(`${resLine}`);
    }
  }


}
