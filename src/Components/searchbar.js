import '../styles/searchbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import React, { useState } from 'react';

class Searchbar extends React.Component {

    render() {
        return(
            <div className='container-fluid' id='samples-container'>
                <div className="container" id="search-bar">
                    <input type="search" id='search' onChange={(e) => this.props.querycallback(e.target.value)} placeholder='Search...'/>
                    <button onClick={this.props.queryclick} className='btn-search'>
                        <FontAwesomeIcon id='search-icon'  icon={faSearch}/>
                    </button>
                </div>
            </div>
        );
    }
}
export default Searchbar;