import fs from 'fs';

export function getContent(params: {
  filePath: string;
  cb: (jsonData: JSON) => void;
}) {
  const { filePath, cb } = params;

  fs.readFile(filePath, (err, data) => {
    if (err) throw err;

    try {
      cb(JSON.parse(data.toString()));

    } catch (error) {
      throw new Error('Server API json parsing error!');
    }
  });
}