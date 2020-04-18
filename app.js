const sarcastify = (inStr, skipSpaces = false, letterSkip = 2) => {
    const indexPredicate = i => i % letterSkip === 0;

    if (skipSpaces) {
        return inStr
            .split(' ')
            .map(word => sarcastify(word))
            .join(' ');
    }
    return inStr
        .toLowerCase()
        .split('')
        .map((char, i) => {
            return indexPredicate(i) ? char.toUpperCase() : char;
        })
        .join('');
};

const updateResultBuilder = (targetElement, transformFunction) => {
    return event => {
        const value = event.target.value;
        targetElement.innerText = transformFunction(value);
    };
};

const transformLinkElement = linkElement => {
    console.log('Copied!');
}

const copyToClipboardBuilder = (linkElement, targetElement) => {
    return event => {
        event.preventDefault();

        /*
         * The following is from this Stack Overflow post:
         * https://stackoverflow.com/questions/47931843/javascript-copy-to-clipboard-not-working/47932145
        */
        let range;
        if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(targetElement);
            range.select();
        }
        else if (window.getSelection) {
            const selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(targetElement);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        try {
            const success = document.execCommand('copy');
            if (success) {
                transformLinkElement(linkElement);
            }
            else {
                alert('Could not copy text to clipboard. Please try again.');
            }
        }
        catch (err) {
            alert('Could not copy text to clipboard. Please try again.');
        }
    }
}

window.onload = () => {
    const outerForm = document.getElementById('outer-form');
    const textInput = document.getElementById('text-input');
    const resultDiv = document.getElementById('result-div');
    const copyLink = document.getElementById('copy-link');

    outerForm.addEventListener('submit', event => {
        // We don't want to actually submit anything; everything should happen "live"
        event.preventDefault();
    });

    const updateResult = updateResultBuilder(resultDiv, sarcastify);
    textInput.addEventListener('input', updateResult);

    const copyToClipboard = copyToClipboardBuilder(copyLink, resultDiv);
    copyLink.addEventListener('click', copyToClipboard);
}
