
const XLSX = require('@sheet/core');
var FileAPI = require('file-api')
const File = FileAPI.File
const FileReader = FileAPI.FileReader


const loadXLSXFileContent = async (file) => {
  if (!file) return null;

  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = ({ target: { result } }) => {
      const data = new Uint8Array(result);
      resolve(XLSX.read(data, { type: 'array' }));
      // resolve(XLSX.read(data, { cellStyles: true, sheetStubs: true })); <-- results in an error
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
};


console.log(XLSX.version);
(async () => {
  const file = new File('test_file.xlsx');
  const wb = await loadXLSXFileContent(file)

  XLSX.writeFile(wb, 'out.xlsx', { cellStyles: true, sheetStubs: true });
})();
