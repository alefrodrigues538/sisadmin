// const { Upload } = require('../models');
const models = require('../models/index');
exports.post = async (req, res, next) => {

    const { originalName: key, size, filename: name, mimetype } = req.file;

    // console.log('File:', req.file)
    // const data = [
    //     {
    //         'owner_id': req.body.owner_id,
    //         'name': name,
    //         'size': size,
    //         'mime_type': mimetype,
    //         'deleted_at': null
    //     }
    // ]
    // console.log('data', data);
    try {
        const result = await models.Uploads.create({
            'owner_id': req.body.owner_id,
            'name': name,
            'size': size,
            'mime_type': mimetype,
            'deleted_at': null
        })

        return res.status(200).json('Imagem Baixada!');

    } catch (err) {
        console.log(err)
        return res.status(500).json({ 'message': err });
    }
}