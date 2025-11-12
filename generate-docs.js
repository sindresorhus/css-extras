#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
Parse CSS file and extract function documentation.
*/
function parseCSSFunctions(cssContent) {
	const functions = [];
	const functionRegex = /@function\s+(--[\w-]+)\s*\(([\s\S]*?)\)\s*{/g;
	const commentRegex = /\/\*\*([\s\S]*?)\*\//g;

	let match;
	const comments = [];

	// Extract all comments with their positions
	while ((match = commentRegex.exec(cssContent)) !== null) {
		comments.push({
			content: match[1],
			index: match.index,
			endIndex: match.index + match[0].length,
		});
	}

	// Match functions with their preceding comments
	functionRegex.lastIndex = 0;
	while ((match = functionRegex.exec(cssContent)) !== null) {
		const functionName = match[1];
		const parametersString = match[2];
		const functionIndex = match.index;

		// Calculate line number
		const lineNumber = cssContent.slice(0, functionIndex).split('\n').length;

		// Find the comment that immediately precedes this function
		let functionComment = null;
		for (let i = comments.length - 1; i >= 0; i--) {
			if (comments[i].endIndex < functionIndex) {
				const between = cssContent.slice(comments[i].endIndex, functionIndex).trim();
				if (between === '') {
					functionComment = comments[i].content;
					break;
				}
			}
		}

		if (functionComment) {
			const documentation = parseComment(functionComment);
			functions.push({
				name: functionName,
				parameters: parseParameters(parametersString),
				lineNumber,
				...documentation,
			});
		}
	}

	return functions;
}

/**
Parse JSDoc-style comment.
*/
function parseComment(comment) {
	const lines = comment.split('\n').map(line => line.trim());
	const documentation = {
		description: '',
		params: [],
		returns: null,
		example: null,
		exampleOutput: null,
	};

	let currentSection = 'description';

	for (const line of lines) {
		if (line.startsWith('@param')) {
			const parameterMatch = line.match(/@param\s+{([^}]+)}\s+(--[\w-]+)\s+-?\s*(.*)$/);
			if (parameterMatch) {
				documentation.params.push({
					type: parameterMatch[1],
					name: parameterMatch[2],
					description: parameterMatch[3],
				});
			}

			currentSection = 'params';
		} else if (line.startsWith('@returns')) {
			const returnsMatch = line.match(/@returns\s+{([^}]+)}\s+(.*)$/);
			if (returnsMatch) {
				documentation.returns = {
					type: returnsMatch[1],
					description: returnsMatch[2],
				};
			}

			currentSection = 'returns';
		} else if (line.startsWith('@example')) {
			documentation.example = line.replace('@example', '').trim();
			currentSection = 'example';
		} else if (line.startsWith('@output')) {
			documentation.exampleOutput = line.replace('@output', '').trim();
			currentSection = 'output';
		} else if (currentSection === 'description' && line && !line.startsWith('@')) {
			documentation.description += (documentation.description ? '\n' : '') + line;
		} else if (currentSection === 'example' && line && !line.startsWith('@')) {
			documentation.example += '\n' + line;
		} else if (currentSection === 'output' && line && !line.startsWith('@')) {
			documentation.exampleOutput += '\n' + line;
		}
	}

	return documentation;
}

/**
Parse function parameters.
*/
function parseParameters(parametersString) {
	if (!parametersString.trim()) {
		return [];
	}

	const parameters = [];
	const parts = parametersString.split(',');

	for (const part of parts) {
		const trimmed = part.trim();
		const colonIndex = trimmed.indexOf(':');

		if (colonIndex > -1) {
			parameters.push({
				name: trimmed.slice(0, colonIndex).trim(),
				defaultValue: trimmed.slice(colonIndex + 1).trim(),
			});
		} else {
			parameters.push({
				name: trimmed,
				defaultValue: null,
			});
		}
	}

	return parameters;
}

/**
Generate Markdown documentation.
*/
function generateMarkdown(functions) {
	let markdown = '# CSS Extras Function Reference\n\n';
	markdown += 'Complete reference for all CSS custom functions in css-extras.\n\n';
	markdown += `**Total functions:** ${functions.length}\n\n`;
	markdown += '---\n\n';

	// Generate function documentation (no categorization)
	for (const cssFunction of functions) {
		const sourceUrl = `../index.css#L${cssFunction.lineNumber}`;
		markdown += `## \`${cssFunction.name}()\` [↗︎](${sourceUrl})\n\n`;

		if (cssFunction.description) {
			markdown += `${cssFunction.description}\n\n`;
		}

		if (cssFunction.params.length > 0) {
			markdown += '### Parameters\n\n';
			for (const parameter of cssFunction.params) {
				const defaultString = cssFunction.parameters.find(p => p.name === parameter.name)?.defaultValue;
				markdown += `- **\`${parameter.name}\`** (\`${parameter.type}\`): ${parameter.description}`;
				if (defaultString) {
					markdown += ` Default: \`${defaultString}\``;
				}

				markdown += '\n';
			}

			markdown += '\n';
		}

		if (cssFunction.returns) {
			markdown += '### Returns\n\n';
			markdown += `\`${cssFunction.returns.type}\`: ${cssFunction.returns.description}\n\n`;
		}

		if (cssFunction.example) {
			markdown += '### Example\n\n';
			markdown += '```css\n';
			markdown += cssFunction.example + '\n';
			if (cssFunction.exampleOutput) {
				markdown += `/* Output: ${cssFunction.exampleOutput} */\n`
			}
			markdown += '```\n\n';
		}

		markdown += '---\n\n';
	}

	return markdown;
}

// Main execution
async function main() {
	const cssPath = path.join(__dirname, 'index.css');
	const cssContent = fs.readFileSync(cssPath, 'utf8');

	console.log('📝 Parsing CSS functions...');
	const functions = parseCSSFunctions(cssContent);
	console.log(`✓ Found ${functions.length} functions`);

	// Generate Markdown only
	console.log('📄 Generating Markdown documentation...');
	const markdown = generateMarkdown(functions);

	// Create docs directory if it doesn't exist
	const documentationDirectory = path.join(__dirname, 'docs');
	if (!fs.existsSync(documentationDirectory)) {
		fs.mkdirSync(documentationDirectory);
	}

	fs.writeFileSync(path.join(documentationDirectory, 'functions.md'), markdown);
	console.log('✓ Written to docs/functions.md');

	console.log('✅ Documentation generated successfully!');
}

await main().catch(error => {
	console.error('Error generating documentation:', error);
	process.exit(1);
});
