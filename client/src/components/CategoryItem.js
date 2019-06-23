import React from 'react';
import './CategoryItem.css'

export default ({ onClick, category, mode}) => {
    let className = "Category_item";
    if(category === mode)
        className += " Select";
    return (
        <li className={className} onClick={onClick}>
            {category}
        </li>
    );
}