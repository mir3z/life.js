export default function TextFileReader(fileReader) {
    return function read(file) {
        return new Promise((resolve, reject) => {
            fileReader.onload = e => resolve(e.target.result);
            fileReader.onerror = e => {
                const error = e.target.error;
                if (error) {
                    reject(error);
                }
            };

            fileReader.readAsText(file);
        });
    }
}