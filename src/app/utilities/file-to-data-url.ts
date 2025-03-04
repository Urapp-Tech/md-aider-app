export default function fileToDataUrl(
  file: Blob,
  callback: (event: ProgressEvent<FileReader>) => void
) {
  const reader = new FileReader();
  reader.onload = callback;
  reader.readAsDataURL(file);
}
