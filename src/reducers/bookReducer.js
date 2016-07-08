import { RECEIVE_BOOKS, SORT_BOOKS } from '../actions';


const bookReducer = (state = {
    books: []
}, action) => {
    const { books, sort, order } = action;
    
    switch (action.type) {
        case SORT_BOOKS:
            return {
                ...state,
                sort,
                order
            };
        case RECEIVE_BOOKS:
            return {
                ...state,
                books,
                receivedAt:  new Date()
            };
        default:
            return state;
    }
};

export default bookReducer;