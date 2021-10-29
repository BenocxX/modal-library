/**
 * When using Highlight.js, code block indention is broke because of html
 * indention in the code file. To fix this, I used this solution:
 * https://stackoverflow.com/a/61896157
 */

// get block however you want.
let block = document.getElementById("the-code");

// remove leading and trailing white space.
let code = block.innerHTML
    .split('\n')
    .filter(l => l.trim().length > 0)
    .join('\n');

// find the first non-empty line and use its
// leading whitespace as the amount that needs to be removed
let firstNonEmptyLine = block.textContent
    .split('\n')
    .filter(l => l.trim().length > 0)[0];

// using regex get the first capture group
let leadingWhiteSpace = firstNonEmptyLine.match(/^([ ]*)/);

// if the capture group exists, then use that to
// replace all subsequent lines.
if(leadingWhiteSpace && leadingWhiteSpace[0]) {
    let whiteSpace = leadingWhiteSpace[0];
    code = code.split('\n')
        .map(l => l.replace(new RegExp('^' + whiteSpace + ''), ''))
        .join('\n');
}

// update the inner HTML with the edited code
block.innerHTML = code;