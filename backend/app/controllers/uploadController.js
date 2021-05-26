const UploadModel = require('../models/UploadImg');
exports.post = async (req, res, next) => {

    const { originalName: name, size, filename: key } = req.file;

    return res.status(200).json(
        {
            file: req.file,
            url: `http://localhost:3003/img/${req.file.filename}`
        }
    );
};