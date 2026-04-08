const fs = require('fs');

fs.writeFile('sample.txt', 'Hello, this is a new file.\n', (err) => {
    if (err) {
        console.log('Error creating file:', err);
        return;
    }
    console.log('File created successfully');

    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err);
            return;
        }
        console.log('File content:', data);

        fs.appendFile('sample.txt', 'This is appended content.\n', (err) => {
            if (err) {
                console.log('Error appending file:', err);
                return;
            }
            console.log('Data appended successfully');

            fs.readFile('sample.txt', 'utf8', (err, data) => {
                if (err) {
                    console.log('Error reading file:', err);
                    return;
                }
                console.log('Updated content:', data);

                fs.unlink('sample.txt', (err) => {
                    if (err) {
                        console.log('Error deleting file:', err);
                        return;
                    }
                    console.log('File deleted successfully');
                });
            });
        });
    });
});