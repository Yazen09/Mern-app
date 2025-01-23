// src/Pages/ListContact.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactCard from '../Components/ContactCard'

const ListContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:2025/api/contacts'); // Récupère les contacts depuis l'API
        setContacts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des contacts', error);
      }
    };

    fetchContacts();
  }, []);  

  return (
    <div className="container">
      <h2>Liste des Contacts</h2>
      <div>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactCard key={contact._id} contact={contact} />
          ))
        ) : (
          <p>Aucun contact trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ListContact;
