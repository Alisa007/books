import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { getBooks, updateBook, deleteBooks, sortBooks } from '../actions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export class BookTable extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired,
        sort: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired
    };

    static defaultProps = {
        books: []
    };

    const cellEditProp = {
        mode: 'click',
        blurToSave: true,
        afterSaveCell: (row, name, value) => {
            const { dispatch } = this.props;

            dispatch(updateBook(row.id, {
                [name]: value
            }));
        }

    };

    const selectRowProp = {
        mode: 'checkbox',
        clickToSelect: true
    };

    const dateFormatter = cell => {
        const date = new Date(cell);

        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    };

    const authorsFormatter = cell => cell.map(c => `${c.firstName} ${c.lastName}`);
    const coverFormatter = cell => <img src={cell} width="100%"/>;
    const options = {
        afterDeleteRow: ids => {
            this.props.dispatch(deleteBooks(ids));
        },

        onSortChange: (sort, order) => {
            this.props.dispatch(sortBooks(sort, order));
        }
    };

    componentDidMount() {
        const { dispatch, sort, order } = this.props;

        dispatch(getBooks());
        this.refs.table.handleSort(order, sort);
    }

    render() {
        const { books } = this.props;

        if (books.length) {
            return (
                <BootstrapTable data={books}
                                cellEdit={cellEditProp}
                                selectRow={selectRowProp}
                                deleteRow={true}
                                striped={true}
                                hover={true}
                                options={options}
                                ref="table">
                    <TableHeaderColumn dataField="id"
                                       isKey={true}
                                       width="50">ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="isbn"
                                       width="150">ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="title"
                                       dataSort={true}>Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="publishedAt"
                                       dataSort={true}
                                       width="70">Year</TableHeaderColumn>
                    <TableHeaderColumn dataField="printedAt"
                                       dataFormat={dateFormatter}
                                       width="100">Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="publisher">Publisher</TableHeaderColumn>
                    <TableHeaderColumn dataField="pagesCount"
                                       width="130">Pages count</TableHeaderColumn>
                    <TableHeaderColumn dataField="authors"
                                       editable={false}
                                       dataFormat={authorsFormatter}>Authors</TableHeaderColumn>
                    <TableHeaderColumn dataField="cover"
                                       dataFormat={coverFormatter}
                                       editable={false}
                                       width="150">Cover</TableHeaderColumn>
                </BootstrapTable>
            )
        } else return null;
    }
}

const mapStateToProps = (state, props) => state.book;

export default connect(mapStateToProps)(BookTable)