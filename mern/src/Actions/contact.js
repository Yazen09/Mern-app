import axios from "axios";
import { ADD_CONTACT,FAIL_CONTACTS,GET_CONTACT,GET_CONTACTS,LOAD_CONTACTS } from "../ActionTypes/Contact";

export const getContacts = () => async (dispatch) => {
    dispatch({ type: LOAD_CONTACTS });
    try {
      let result = await axios.get("/api/contact/alluser");
      dispatch({ type: GET_CONTACTS, payload: result.data });
    } catch (error) {
      dispatch({ type: FAIL_CONTACTS, payload: error.response });
    }
  };
  
  export const addContact = (newContact, navigate) => async (dispatch) => {
    dispatch({ type: LOAD_CONTACTS });
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      let result = await axios.post("/api/contact/add-contact", newContact, config);
      dispatch({ type: ADD_CONTACT, payload: result.data });
      navigate("/contacts");
    } catch (error) {
      dispatch({ type: FAIL_CONTACTS, payload: error.response });
    }
  };
  
  export const deleteContact = (id) => async (dispatch) => {
    dispatch({type: LOAD_CONTACTS})
    try{
        await axios.delete(`/api/contact/${id}`)
    }   dispatch (getContacts())
  } catch (error) {
    dispatch({type: FAIL_CONTACTS,payload : error.response})
  }