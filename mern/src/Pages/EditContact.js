import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditContact = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`/api/contacts/${id}`);
        setContact(res.data);
      } catch (error) {
        console.error('There was an error fetching the contact!', error);
      }
    };

    fetchContact();
  }, [id]);

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/contacts/${id}`, contact);
      navigate('/');
    } catch (error) {
      console.error('There was an error updating the contact!', error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Contact</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={contact.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={contact.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={contact.phone}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default EditContact;
