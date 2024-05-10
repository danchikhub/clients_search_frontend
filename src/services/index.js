import { api } from 'src/boot/axios';

export const createSubject = async (data) => {
    const response = await api.post('subject/create', data)
    return response
}

export const createIndividual = async (data) => {
    const response = await api.post('individual/create', data)
    return response
}

export const createLegal = async (data) => {
    const response = await api.post('legal/create', data);
    return response
}

export const createContact = async (data) => {
    const response = await api.post('contact/create', data)
    return response
}

export const createDocument = async (data) => {
    const response = await api.post('document/create', data)
    return response
}
export const createAddress = async (data) => {
    const response = await api.post('address/create', data)
    return response
}

export const createNote = async (data) => {
    const response = await api.post('note/create', data)
    return response
}

export const getClient = async (param, value, clientType) => {
    const response = await api.get('search/search-client', {
        params: {
            [param]: value,
            clientType
        }
    })

    return response
}

export const fetchSubject = async (subjectId) => {
    const response = await api.get('subject/getData', {
        params: {
            subjectId: subjectId
        }
    })

    return response
}

export const fetchIndividual = async (subjectId) => {
    const response = await api.get('individual/getData', {
        params: {
            subjectId: subjectId
        }
    })

    return response
}

export const fetchLegal = async (subjectId) => {
    const response = await api.get('legal/getData', {
        params: {
            subjectId: subjectId
        }
    })

    return response
}

export const fetchContacts = async (subjectId) => {
    const response = await api.get('contact/getData', {
        params: {
            subjectId: subjectId
        }
    })

    return response
}

export const fetchDocuments = async (subjectId) => {
    const response = await api.get('document/getData', {
        params: {
            subjectId: subjectId
        }
    })

    return response
}

export const fetchAddress = async (subjectId) => {
    const response = await api.get('address/getData', {
        params: {
            subjectId: subjectId
        }
    })

    return response
}

export const fetchNote = async (subjectId) => {
    const response = await api.get('note/getData', {
        params: {
            subjectId: subjectId
        }
    })

    return response
}