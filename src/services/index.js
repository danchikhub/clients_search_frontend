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