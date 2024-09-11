

export default function fileToBase64(fileInputElement: HTMLInputElement): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const file = (fileInputElement.files || [])[0];

    if (!file) {
      reject("No file selected. Please choose a file.");
      return;
    }

    reader.readAsDataURL(file);

    reader.onerror = () => reject("Error reading file. Please try again.");

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject("File could not be converted to base64.");
      }
    };
  });
}
