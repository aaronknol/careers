import React from 'react';
import JobDepartment from './JobDepartment';

function DepartmentList (props) {
    return (
        props.selectedOffice ? (
            <ul className="job-listings panel-group">
            {
                props.selectedOffice.departments.map((department, index) => {
                    return (
                        <JobDepartment key={department} department={department} selectedOffice={props.selectedOffice} jobs={props.selectedOffice.jobs}></JobDepartment>
                    )
                })
            }   
            </ul>) : null
        
    )
}

export default DepartmentList