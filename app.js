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
        targetElement.focus();
        targetElement.select()

        try {
            const success = document.execCommand('copy');
            if (success === 'successful') {
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

    outerForm.addEventListener('submit', event => {
        // We don't want to actually submit anything; everything should happen "live"
        event.preventDefault();
    });

    const updateResult = updateResultBuilder(resultDiv, sarcastify);
    textInput.addEventListener('input', updateResult);
}
