/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

import * as vscode from 'vscode';
import { ProviderResult } from 'vscode';
import { activateDebug } from './activateDebug';

export function activate(context: vscode.ExtensionContext) {
	activateDebug(context, new DebugAdapterExecutableFactory());
}

export function deactivate() {
	// nothing to do
}

class DebugAdapterExecutableFactory implements vscode.DebugAdapterDescriptorFactory {

	// The following use of a DebugAdapter factory shows how to control what debug adapter executable is used.
	// Since the code implements the default behavior, it is absolutely not neccessary and we show it here only for educational purpose.

	createDebugAdapterDescriptor(_session: vscode.DebugSession, executable: vscode.DebugAdapterExecutable | undefined): ProviderResult<vscode.DebugAdapterDescriptor> {
		const file_extension = _session.configuration.program.split('.').pop();
		let gillian_executable_command : string;
		// Match of the file extension first
		switch (file_extension) {
			case "js":
				gillian_executable_command = "gillian-js";
				break;
			case "wisl":
				gillian_executable_command = "wisl";
				break;
			case "gil":
				// Check the target language if it is a GIL file
				switch (_session.configuration.targetLanguage) {
					case "js":
						gillian_executable_command = "gillian-js";
						break;
					case "wisl":
					default:
						// Default to WISL
						gillian_executable_command = "wisl";
						break;
				}
				break;
			default:
				// Default to WISL
				gillian_executable_command = "wisl";
				break;
		}

		const command = "esy";
		const args = ["x", gillian_executable_command, "debugverify", "-r", "db,file"];
		const options = {
			cwd: __dirname + "/../../../Gillian"
		};
		executable = new vscode.DebugAdapterExecutable(command, args, options);

		// make VS Code launch the DA executable
		return executable;
	}
}