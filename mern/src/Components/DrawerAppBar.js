import React from 'react';
import { Link } from 'react-router-dom';

const DrawerAppBar = () => {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f5f5f5' }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contacts">Contacts</Link>
      <Link to="/add">Add Contact</Link> {/* Lien vers la page d'ajout de contact */}
    </nav>
  );
};

export default DrawerAppBar;
