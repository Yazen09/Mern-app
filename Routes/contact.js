const express = require('express');
const isAuth = require('../middlewres/isAuth.js');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Contact = require('../Model/Contact.js')
const upload =require('../middlewres/multer.js')


router.post("/add-contact", isAuth, upload.single('image'), async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.phone) {
        return res.status(400).send('Tous les champs sont requis: name, email, phone');
    }

    if (!req.file) {
        return res.status(400).send('L\'image est requise');
    }

    try {
        // Upload de l'image sur Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Création du contact avec l'URL de l'image téléchargée
        let newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            profile_img: result.secure_url,   // URL de l'image
            cloudinary_id: result.public_id,  // ID de l'image
        });

        // Sauvegarde du contact dans la base de données
        await newContact.save();

        // Réponse avec succès
        res.status(200).send('Contact ajouté avec succès');
    } catch (error) {
        console.error("Erreur complète lors de l'ajout du contact : ", error); // Affiche l'erreur complète
        res.status(400).send(`Erreur lors de l'ajout du contact : ${error.message}`);
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