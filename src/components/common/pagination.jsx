import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'; // underscore

const Pagination = (props) => {
    const {moviesCount, numMoviesPerPage, activePage, selectPage} = props;  
    
    const pagesCount = Math.ceil(moviesCount / numMoviesPerPage);
    if(pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1)
    
    return ( 
        <nav aria-label="...">
             <ul className="pagination">
                {pages.map(page =>
                     <li key={ page } onClick={() => selectPage(page)}  className={ (page === activePage) ? 'page-item active' : 'page-item' }>
                        <span className="page-link">{ page }</span>
                     </li>                
                 )}                
             </ul>
           </nav>
        );
}
 
Pagination.propTypes = {
    moviesCount: PropTypes.number.isRequired, 
    numMoviesPerPage: PropTypes.number.isRequired, 
    activePage: PropTypes.number.isRequired, 
    selectPage: PropTypes.func.isRequired
};
export default Pagination;