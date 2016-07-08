import axios from 'axios';
import {reset} from 'redux-form';

export const SUBMIT_FORM = 'SUBMIT_FORM';
export const GET_ERROR = 'GET_ERROR';
export const POST_ERROR = 'POST_ERROR';
export const POST_SUCCESS = 'POST_SUCCESS';
export const PUT_SUCCESS = 'PUT_SUCCESS';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const SORT_BOOKS = 'SORT_BOOKS';

export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';

const submitForm = form => {
    return {
        type: SUBMIT_FORM,
        form
    };
};

const handleError = err => {
    return {
        type: GET_ERROR,
        error: err
    };
};

const requestBooks = () => {
    return {
        type: REQUEST_BOOKS
    };
};

const deleteSuccess = () => {
    return {
        type: DELETE_SUCCESS
    };
};

const updateSuccess = () => {
    return {
        type: PUT_SUCCESS
    };
};

const receiveBooks = (json) => {
    const books = json.map(book => ({
        ...book,
        year: new Date(book.date).getFullYear()
    }));
    
    return {
        type: RECEIVE_BOOKS,
        books
    };
};

export const getBooks = () => {
    return dispatch => {
        dispatch(requestBooks());

        return axios.get('/book')
            .then(res => dispatch(receiveBooks(res.data)))
            .catch(err => dispatch(handleError(err)));
    };
};

export const updateBook = (id, prop) => {
    return dispatch => {
        return axios.put(`/book/${id}`, prop)
            .then(res => dispatch(updateSuccess()))
            .catch(err => dispatch(handleError(err)));
    };
};

export const deleteBooks = ids => {
    return dispatch => {
        for (const id of ids) {
            axios.delete(`/book/${id}`)
                .then(res => dispatch(deleteSuccess(res.data)))
                .catch(err => dispatch(handleError(err)));
        }
    };
};

export const createBook = form => {
    return dispatch => {
        dispatch(submitForm(form));

        const { title, authors, pagesCount, publisher, publishedAt, printedAt, isbn, cover } = form;
        const data = new FormData();

        if (cover) {
            data.append('file', cover[0]);
        }

        data.append('title', title);
        data.append('authors', authors);
        data.append('pagesCount', pagesCount);
        data.append('publisher', publisher);
        data.append('publishedAt', publishedAt);
        data.append('printedAt', printedAt);
        data.append('isbn', isbn);

        return axios.post(`/book`, data)
            .then(res => {
                dispatch(getBooks());
                return dispatch(reset('book'));
            })
            .catch(err => dispatch(handleError(err)));
    };
};

export const sortBooks = (sort, order) => {
    return {
        type: SORT_BOOKS,
        sort,
        order
    };
};