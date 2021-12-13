import React from 'react';
import './SearchForm.css';
import {useState} from "react";

function SearchForm () {

    const [isChange, setIsChange] = useState(false);

    function handleToggle () {
      setIsChange(!isChange);
    }


    return (
        <section className='search'>
            <form name="Search" title="search" className='search__form'> 

            <div className='search__query'>
                <input className="search__field" type="text" value='' placeholder="Фильм" name="film" minLength={2} required id="title" />
                <button className="search__find" type="submit" id="searchButton" aria-label="поиск">Найти</button>
            </div>
            <div className='search__filter'>
            <input className='search_shortilms' id='filter' type="checkbox" checked={isChange} onChange={()=>{}} onClick= {handleToggle}>
            </input>
            <label htmlFor="filter" className='search_shortilms_label'></label>
            {/* <button className="switch-btn switch-on"></button> */}
            <p className='search__filter_title'>Короткометражки</p>
            </div>

            </form>
          </section>  )
}


export default SearchForm;
