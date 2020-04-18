const updateResultBuilder = targetElement => {
    return event => {
        const value = event.target.value;
        targetElement.innerText = value;
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

    const updateResult = updateResultBuilder(resultDiv);
    textInput.addEventListener('input', updateResult);
}
