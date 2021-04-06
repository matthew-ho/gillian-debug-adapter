/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

import * as vscode from 'vscode';
import { ProviderResult } from 'vscode';
import { activateMockDebug } from './activateMockDebug';

export function activate(context: vscode.ExtensionContext) {
	activateMockDebug(context, new DebugAdapterExecutableFactory());
}

export function deactivate() {
	// nothing to do
}

class DebugAdapterExecutableFactory implements vscode.DebugAdapterDescriptorFactory {

	// The following use of a DebugAdapter factory shows how to control what debug adapter executable is used.
	// Since the code implements the default behavior, it is absolutely not neccessary and we show it here only for educational purpose.

	createDebugAdapterDescriptor(_session: vscode.DebugSession, executable: vscode.DebugAdapterExecutable | undefined): ProviderResult<vscode.DebugAdapterDescriptor> {
		const command = "esy";
		const args = ["x", "wisl", "debugverify"];
		const options = {
			cwd: __dirname + "/../../../Gillian"
		};
		executable = new vscode.DebugAdapterExecutable(command, args, options);

		// make VS Code launch the DA executable
		return executable;
	}
}