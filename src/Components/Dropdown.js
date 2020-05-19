import React from 'react';
import DropdownButton from './DropdownButton';

function Dropdown (props) {
    const [showDropdown, setShowdropdown] = React.useState(false);

    function handleButtonClick() {
        setShowdropdown(!showDropdown);
    }

    return (
        <div className="dropdown office-locations">
            <DropdownButton clickHandler={handleButtonClick} text={props.selectedOffice && props.selectedOffice.name ? props.selectedOffice.name : 'Select an office'}></DropdownButton>
            {
                showDropdown ? (
                    <div className="dropdown__wrapper dropdown-menu office-locations__dropdown">
                        <ul className="dropdown__ul">
                            {
                                props.offices.map(office => {
                                    return (
                                        (
                                            <li key={office.name} className={office.name === props.selectedOffice && props.selectedOffice.name ? 'dropdown__li is-selected' : 'dropdown__li' }>
                                                <button 
                                                    className="dropdown-item office-locations__location-button" 
                                                    onClick={(e) => { 
                                                        props.setSelectedOffice(office); 
                                                        setShowdropdown(false); 
                                                    }}
                                                    aria-selected={ office.name === props.selectedOffice ? 'true' : 'false' }>
                                                    {office.name} ({office.jobs.length})
                                                </button>
                                            </li>
                                        )
                                    )
                                })
                            }
                        </ul>
                    </div>
                ) : null
            }
        </div>
    )
}

export default Dropdown