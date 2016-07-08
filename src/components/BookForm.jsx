import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createBook } from '../actions';

export const fields = [ 
    'title', 'authors', 'pagesCount', 'publisher', 'publishedAt', 'printedAt', 'isbn', 'cover' ];
const validate = form => {
    const errors = {};
    const now = new Date();
    const isbnRegex = /(ISBN[-]*(1[03])*[ ]*(: ){0,1})*(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})/;

    if (!form.title) {
        errors.title = 'Required';
    } else if (form.title.length > 30) {
        errors.title = 'Must be 30 characters or less';
    }

    if (!form.authors) {
        errors.authors = 'Required';
    }

    if (!form.pagesCount) {
        errors.pagesCount = 'Required';
    }  else if (isNaN(form.pagesCount)) {
        errors.pagesCount = 'Must be a number';
    } else if (form.pagesCount < 1 || form.pagesCount > 10000) {
        errors.pagesCount = 'Must be between 1 and 10000';
    }

    if (form.publisher > 30) {
        errors.publisher = 'Must be 30 characters or less';
    }

    if (!form.publishedAt) {
        errors.publishedAt = 'Required';
    } else if (form.publishedAt < 1800 || form.publishedAt > now.getFullYear()) {
        errors.publishedAt = 'Invalid year';
    }

    if (!form.printedAt) {
        errors.printedAt = 'Required';
    } else if (form.printedAt < new Date(1880, 1, 1) || form.printedAt > now) {
        errors.printedAt = 'Invalid date';
    }

    if (!form.isbn) {
        errors.isbn = 'Required';
    } else if (!isbnRegex.test(form.isbn)) {
        errors.isbn = 'Invalid ISBN';
    }

    return errors;
};

export class BookForm extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        submitting: PropTypes.bool.isRequired
    };

    static defaultProps = {
    };

    handleSubmit = form => {
        const { dispatch } = this.props;
        
        dispatch(createBook(form));
    };

    render() {
        const {
            fields: { title, authors, pagesCount, publisher, publishedAt, printedAt, isbn, cover },
            handleSubmit,
            submitting
        } = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="form-group row">
                    <div className="col-xs-4">
                        <input type="text"
                               required="true"
                               maxLength="30"
                               className="form-control"
                               placeholder="Title" {...title}/>
                    </div>

                    <div className="col-xs-4">
                        <input type="string"
                               required="true"
                               pattern="(ISBN[-]*(1[03])*[ ]*(: ){0,1})*(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})"
                               className="form-control col-xs-4"
                               placeholder="ISBN" {...isbn}/>
                    </div>
                    <div className="col-xs-4">
                        <input type="number"
                               required="true"
                               className="form-control"
                               placeholder="Number of pages" min="1" max="10000" {...pagesCount}/>
                    </div>
               </div>

                <div className="form-group row">
                    <div className="col-xs-4">
                        <input type="text"
                               maxLength="30"
                               className="form-control"
                               placeholder="Publisher" {...publisher}/>
                    </div>
                    <div className="col-xs-4">
                        <input type="text"
                               required="true"
                               pattern="^(\w+\s\w+)(,\s*\w+\s\w+)*$"
                               className="form-control"
                               placeholder="Authors" {...authors}/>
                    </div>

                    <div className="col-xs-4">
                        <input type="number"
                               required="true"
                               min="1800" max="2016"
                               value="2000"
                               className="form-control"
                               placeholder="Year publised" {...publishedAt}/>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-xs-4">
                        <input type="date"
                               required="true"
                               min="1800-01-01"
                               className="form-control"
                               placeholder="Date printed" {...printedAt}/>
                    </div>

                    <div className="col-xs-4">
                        <input  className="form-control" type="file" {...cover} value={null}/>
                    </div>

                    <div className="col-xs-4">
                        <button type="submit"
                                className="btn btn-primary btn-block"
                                disabled={submitting}>
                            {submitting ? <i/> : <i/>} Submit
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'book',
    fields
})(BookForm);