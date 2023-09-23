
const UrlToFile = async (dataURL, fileName) => {
  const blob = new Blob([dataURL], {
    type: fileName,
  });

  const file = new File([blob], fileName, {
    type: fileName,
  });

  return file
};

export default UrlToFile;
