document.querySelector('.run').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission reload

    const codeEditor = document.getElementById('codeEditor');
    const outputField = document.getElementById('outputField');

    // Get the code from the editor
    const code = codeEditor.value;

    if (!code.trim()) {
        outputField.value = "Please write some code before running!";
        return;
    }

    // Send the code to the C++ container
    try {
        const response = await fetch('http://localhost:5000/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const result = await response.json();

        // Display the output or errors
        outputField.value = result.output || result.error;
    } catch (error) {
        outputField.value = `Error: ${error.message}`;
    }
});
