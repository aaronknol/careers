import React from 'react';

function DropdownButton (props) {
    return (
        <button type="button" onClick={props.clickHandler} className="btn btn-secondary dropdown-toggle office-locations__button">
            <span className="office-locations__button-title">{props.text ? props.text : 'Select an office'}</span>
            <div className="fa fa-angle-down"></div>
        </button>
    )
}

export default DropdownButton