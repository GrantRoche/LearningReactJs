import React, { Component } from 'react';

class TableHeader extends Component {
   
    raiseSort = path => {
        const sortColumn = {...this.props.sortColumn};
        if(sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else{
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    }

    renderSortIcon = column => {
        const {sortColumn} = this.props;
        console.log(sortColumn)
        console.log(column.path
            )
        if(column.path !== sortColumn) return null;
        if(sortColumn === 'asc') return <i className="fa fa-sort-asc"></i>;
        return <i className="fa fa-sort-desc"></i>;
    }

    render() { 
        return (    
            <thead>
                <tr>
                    { this.props.columns.map(column => 
                        <th 
                        key={column.path || column.key} 
                        onClick={() => this.raiseSort(column.path)}>
                            { column.label  }
                            { this.renderSortIcon(column) }
                        </th>
                    )}                   
                </tr>
            </thead>
         );
    }
}
 
export default TableHeader;