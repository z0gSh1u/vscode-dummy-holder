/* eslint-disable curly */

/**
 * vscode-dummy-holder
 * by z0gSh1u @ 2020-05
 * https://github.com/z0gSh1u/vscode-dummy-holder
 */

import * as vscode from 'vscode'
import { generateImage, generateParagraph, copy } from './placeholder'

/**
 * Insert text to current document.
 */
function insertToDocument(text: string) {
  let textEditor = vscode.window.activeTextEditor
  if (!textEditor)
    vscode.window.showErrorMessage('[vscode-dummy-holder] ' + 'No active text editor.')
  let edits = []
  for (let selection of textEditor.selections)
    edits.push(vscode.TextEdit.insert(selection.active, text))
  let workspaceEdit = new vscode.WorkspaceEdit()
  workspaceEdit.set(textEditor.document.uri, edits)
  vscode.workspace.applyEdit(workspaceEdit).then(
    () => {},
    err => {
      vscode.window.showErrorMessage('[vscode-dummy-holder] ' + err)
    }
  )
}

export function activate(context: vscode.ExtensionContext) {
  // register generate image command
  let generateImageCommand = vscode.commands.registerCommand(
    'vscode-dummy-holder.generateImage',
    () => {
      vscode.window.showInputBox({ placeHolder: 'Enter your command...' }).then(command => {
        try {
          const url = generateImage(command)
          insertToDocument(url)
          const config =
            vscode.workspace.getConfiguration('vscode-dummy-holder').get('copy') || false
          config && copy(url)
        } catch (e) {
          vscode.window.showErrorMessage('[vscode-dummy-holder] ' + e)
        }
      })
    }
  )
  context.subscriptions.push(generateImageCommand)
  // register generate paragraph command
  let generateParagraphCommand = vscode.commands.registerCommand(
    'vscode-dummy-holder.generateParagraph',
    () => {
      vscode.window.showInputBox({ placeHolder: 'Enter your command...' }).then(command => {
        try {
          let paragraph = generateParagraph(command)
          insertToDocument(paragraph)
          const config =
            vscode.workspace.getConfiguration('vscode-dummy-holder').get('copy') || false
          config && copy(paragraph)
        } catch (e) {
          vscode.window.showErrorMessage('[vscode-dummy-holder] ' + e)
        }
      })
    }
  )
  context.subscriptions.push(generateParagraphCommand)
}

export function deactivate() {}
