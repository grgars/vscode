/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'vscode' {

	// https://github.com/microsoft/vscode/issues/145234

	export interface TerminalExecuteCommandEvent {
		terminal: Terminal;
		command: TerminalCommand<TerminalExecuteCommandResult>;
	}

	// NOTE: The generic here is for the future executeCommand function where the result isn't available.
	export interface TerminalCommand<T extends TerminalExecuteCommandResult | Promise<TerminalExecuteCommandResult>> {
		/**
		 * The {@link Terminal} the command was executed in.
		 */
		terminal: Terminal;
		/**
		 * The full command line that was executed, including both the command and the arguments.
		 */
		commandLine: string;
		/**
		 * The current working directory that was reported by the shell. This will be a {@link Uri}
		 * if the string reported by the shell can reliably be mapped to the connected machine.
		 */
		cwd: Uri | string | undefined;
		/**
		 * The result of the command.
		 */
		result: T;
	}

	export interface TerminalExecuteCommandResult {
		/**
		 * The exit code reported by the shell.
		 */
		exitCode: number;
		/**
		 * The output of the command when it has finished executing. This is the plain text shown in
		 * the terminal buffer and does not include raw escape sequences..
		 */
		output: string;
	}

	export namespace window {
		/**
		 * An event that is emitted when a terminal with shell integration activated has started
		 * executing a command.
		 */
		export const onWillExecuteTerminalCommand: Event<Thenable<TerminalExecuteCommandEvent>>;
		/**
		 * An event that is emitted when a terminal with shell integration activated has completed
		 * executing a command.
		 */
		export const onDidExecuteTerminalCommand: Event<TerminalExecuteCommandEvent>;
	}
}
