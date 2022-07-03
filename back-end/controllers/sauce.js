const Sauce = require('../models/Sauce');
const fs = require('fs');
let sauce = [];

exports.createSauce = (req, res, next) => {
    const sauceObject =  JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error}));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.Sauce),
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    const sauce = new Sauce({
        _id: req.params.id,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        imageUrl:req.body.imageUrl,
        mainPepper:req.body.mainPepper,
        heat:req.body.heat
    });
    Sauce.updateOne({_id: req.params.id},{...sauceObject, _id: req.params.id})
    .then(() => {
        res.status(201).json({ message: 'Sauce updated successfully !'});
    }).catch(
        (error) => {
            res.status(400).json({ error : error});
        }
    );
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne().then(
        (sauce) => {
            console.log(sauce);
            res.status(201).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};