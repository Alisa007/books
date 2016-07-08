import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BookTable, BookForm } from '../components';

export class BookPage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <BookForm/>
                <hr/>
                <BookTable/>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(BookPage)