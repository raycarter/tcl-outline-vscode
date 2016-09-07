'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // output
    let channel = vscode.window.createOutputChannel('tcl outline');
    let tclOutline = new TclOutline(channel);
    let tclOutlineUnsorted = vscode.commands.registerCommand('extension.tclOutlineUnsorted', () => {
        
        tclOutline.parseCurrentFile(false);
        
    });
    context.subscriptions.push(tclOutlineUnsorted);

    let tclOutlineSorted = vscode.commands.registerCommand('extension.tclOutlineSorted', () => {
        
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
        let text = vscode.window.activeTextEditor.document.getText();

        
        let procReg = new RegExp('^\s*proc(.+?})');
        let procFoundList = [];
        // parse text for proc
        let foundCount = 0, lineNum = 0;
        for (let line of text.split('\n')) {
            lineNum++;
            let procFound = procReg.exec(line);
            if (procFound !== null) {
                foundCount++;
                let u = vscode.window.activeTextEditor.document.uri.path;
                let anchor = `${vscode.window.activeTextEditor.document.uri}:${lineNum-1}`;
                // channel.appendLine(anchor);
                procFoundList.push(procFound[1] + ' -- ' + anchor + '\n');
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

class TclOutlineInfo {
    private fileName: string;
    private lineNum: number;

    constructor (fn: string, num: number) {
        this.fileName = fn;
        this.lineNum = num;
    }
}