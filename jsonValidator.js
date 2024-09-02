// jsonValidator.js
(function(global) {
    'use strict';

    function validateJSON(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            const formatted = JSON.stringify(parsed, null, 4); // Format JSON
            return { valid: true, error: null, formatted: formatted };
        } catch (e) {
            const errorDetails = getErrorDetails(jsonString, e.message);
            return { valid: false, error: e.message, details: errorDetails };
        }
    }

    function getErrorDetails(jsonString, errorMessage) {
        const lines = jsonString.split('\n');
        let errorLine = -1;
        let errorChar = -1;

        const match = errorMessage.match(/at position (\d+)/);
        if (match) {
            const position = parseInt(match[1], 10);
            let currentPos = 0;

            for (let i = 0; i < lines.length; i++) {
                currentPos += lines[i].length + 1; // +1 for newline character
                if (currentPos >= position) {
                    errorLine = i + 1;
                    errorChar = position - (currentPos - lines[i].length);
                    break;
                }
            }
        }

        return { line: errorLine, character: errorChar };
    }

    global.jsonValidator = {
        validate: validateJSON
    };

})(this);
