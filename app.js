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


window.onload = () => {
    const outerForm = document.getElementById('outerForm');
    const textInput = document.getElementById('textInput');
    const resultDiv = document.getElementById('resultDiv');

    outerForm.addEventListener('submit', event => {
        // We don't want to actually submit anything; everything should happen "live"
        event.preventDefault();
    });

    const updateResult = updateResultBuilder(resultDiv, sarcastify);
    textInput.addEventListener('input', updateResult);
}
