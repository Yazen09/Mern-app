import { FAIL_CONTACTS,GET_CONTACT,GET_CONTACTS,LOAD_CONTACTS } from "../ActionTypes/Contact";

const initialState = {
    listContacts : [],
    contactToGet : {},
    load : false ,
    erros : null ,
}



const contactReducer = ( state = initialState , {type,payload} ) => {
    switch (type) {
        case LOAD_CONTACTS :
            return {...state, load:true}
        case GET_CONTACTS :
            return {...state , load:false ,listContacts:payload.listContacts}
        case GET_CONTACT :
            return {...state , load : false , contactToGet:payload.ContactToGet}
        case FAIL_CONTACTS :
            return {...state , load : false , erros : payload}
        default : 
            return state ;
    }
}

export default contactReducer


