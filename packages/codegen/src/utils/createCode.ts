export const createCode = (xml: string, fileName: string) => {
  if ('download' in document.createElement('a')) {
    const eleLink = document.createElement('a');
    eleLink.download = `${fileName}.tsx`;
    const blob = new Blob([xml]);
    eleLink.href = URL.createObjectURL(blob);

    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
  }
};
