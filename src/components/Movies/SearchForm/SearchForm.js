import React from 'react';
import './SearchForm.css';
import {useState} from "react";

function SearchForm (props) {
    
     const [filterShort, setFilterShort] = props.filterShorts;
    const [query, setQuery] = useState('');
    const [savedQuery, setSavedQuery] = useState('');
       
     function handleToggle () {
      setFilterShort(!filterShort);
    }

    function handleChange(e) {
      if (props.isSaved) {
          setSavedQuery (e.target.value) }
        else {
          setQuery (e.target.value);
        }
      }

      function handleSubmit (e) {
        e.preventDefault();
        props.searchQuery(props.isSaved, filterShort);
     }

    return (
        <section className='search'>
            <form name="Search" title="search" 
              className='search__form'
              onSubmit={handleSubmit} 
              onChange = {handleChange}>  

            <div className='search__query'>
              <input type="text" className="search__field" 
                
                placeholder="Фильм" 
                name="film" 

                // value = {query}
                //minLength={1} 
                required id="title" 
                onChange = {handleChange}
                />
                <button className="search__find" type="submit" id="searchButton" aria-label="поиск">Найти</button>
            </div>
            <div className='search__filter'>
            <input className='search_shortilms' 
            id='filter' 
            type="checkbox" 
            checked={filterShort} 
            onChange={handleToggle} >

            </input>
            <label htmlFor="filter" className='search_shortilms_label'></label>
            
            <p className='search__filter_title'>Короткометражки</p>
            </div>
            </form>
          </section>  )
}


export default SearchForm;
