const express = require('express');
const isAuth = require('../middlewres/isAuth.js');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Contact = require('../Model/Contact.js')
const upload =require('../middlewres/multer.js')


router.post("/add-contact", isAuth, upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        let newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            profile_img: result.secure_url,
            cloudinary_id: result.public_id,
        });
        await newContact.save();
        res.status(200).send('Contact ajouté');
    } catch (error) {
        res.status(400).send(`Contact n'est pas ajouté: ${error.message}`);
    }
});


router.get("/all-contact", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(400).send(`Erreur lors de la récupération des contacts: ${error.message}`);
    }
});


router.delete("/delete-contact/:id", async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).send('Contact non trouvé');
        }
        await cloudinary.uploader.destroy(contact.cloudinary_id);
        await contact.remove();
        res.status(200).send('Contact supprimé');
    } catch (error) {
        res.status(400).send(`Erreur lors de la suppression du contact: ${error.message}`);
    }
});


router.put("/update-contact/:id", upload.single('image'), async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).send('Contact non trouvé');
        }
        let result;
        if (req.file) {
            await cloudinary.uploader.destroy(contact.cloudinary_id);
            result = await cloudinary.uploader.upload(req.file.path);
        }
        const data = {
            name: req.body.name || contact.name,
            email: req.body.email || contact.email,
            phone: req.body.phone || contact.phone,
            profile_img: result ? result.secure_url : contact.profile_img,
            cloudinary_id: result ? result.public_id : contact.cloudinary_id,
        };
        contact = await Contact.findByIdAndUpdate(req.params.id, data, { new: true });
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).send(`Error while update: ${error.message}`);
    }
});
module.exports = router;