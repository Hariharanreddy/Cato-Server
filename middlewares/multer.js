//multer is used to access the file from the form
//accessed using req.file
//below is the boilerplate

import multer from "multer";

//storing file in memory storage of server.
const storage = multer.memoryStorage();

export const singleUpload = multer({
    storage,
}).single("file");