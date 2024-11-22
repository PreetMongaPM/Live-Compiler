const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.post('/run', (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    }

    // Write the code to a temporary file
    const codeFile = 'temp.cpp';
    const outputFile = 'temp.out';

    fs.writeFileSync(codeFile, code);

    // Compile the C++ code
    exec(`g++ ${codeFile} -o ${outputFile}`, (compileErr, stdout, stderr) => {
        if (compileErr) {
            // Compilation failed
            return res.status(400).json({ error: stderr });
        }

        // Run the compiled code
        exec(`./${outputFile}`, (runErr, runStdout, runStderr) => {
            // Clean up files
            fs.unlinkSync(codeFile);
            fs.unlinkSync(outputFile);

            if (runErr) {
                // Runtime error
                return res.status(400).json({ error: runStderr });
            }

            // Return the output
            res.json({ output: runStdout });
        });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`C++ Compiler service running on port ${PORT}`);
});
