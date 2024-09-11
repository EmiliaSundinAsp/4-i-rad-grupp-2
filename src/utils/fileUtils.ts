export default function fileToBase64(fileInputElement: HTMLInputElement) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const file = (fileInputElement.files || [])[0];

    if (!file) {
      reject("No file selected");
      return;
    }

    reader.readAsDataURL(file);
    reader.onerror = () => reject("Error reading file");
    reader.onload = () => resolve(reader.result);
  });
}