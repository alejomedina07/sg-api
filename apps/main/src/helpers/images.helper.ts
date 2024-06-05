export const renameImage = (req, file, callback) => {
  // const name = file.originalname.split('.')[0];
  // const filename = file.originalname;
  const extension = file.originalname.split('.').pop();
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `prevision-${randomName}.${extension}`);
};

export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
    return callback(new Error('Invalid Format type'), false);
  }
  callback(null, true);
};
