// src/Pages/AddContact.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    image: null,  // Nouveau champ pour l'image
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setContact({ ...contact, image: e.target.files[0] });  // Gestion de l'image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérification si tous les champs sont remplis
    if (!contact.name || !contact.email || !contact.phone || !contact.image) {
      alert('Tous les champs sont requis.');
      return;
    }

    const formData = new FormData();
    formData.append('name', contact.name);
    formData.append('email', contact.email);
    formData.append('phone', contact.phone);
    formData.append('image', contact.image);  // Ajout du fichier image

    try {
      // Envoi de la requête POST avec les données du formulaire et l'image
      await axios.post('http://localhost:2025/api/add-contact', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Spécifie le type de contenu
        },
      });
      alert('Contact ajouté avec succès !');
      navigate('/contacts');  // Redirection vers la liste des contacts
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contact', error);
      alert('Erreur lors de l\'ajout du contact');
    }
  };

  return (
    <div className="container">
      <h2>Ajouter un nouveau contact</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Nom:</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Téléphone:</label>
          <input
            type="text"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}  // Gestion de l'image
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter le contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;
