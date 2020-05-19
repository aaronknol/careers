import React from 'react';
import JobPosition from './JobPosition';

function JobDepartment (props) {
    const [isOpen, setIsOpen] = React.useState(false);
    let numJobsInDepartment = 1;

    function getNumberJobsInDepartment (department) {
        numJobsInDepartment = props.jobs.filter(function (job) {
            return (job.departments[0].name === department)
        });

        return numJobsInDepartment.length;
    }

    return (
        <li key={props.department} className={ isOpen ? 'panel is-open' : 'panel' }>
            <h3 className="panel-title department">
                <button type="button" className="panel-title__button" onClick={() => setIsOpen(!isOpen)} >
                    { props.department } ({ getNumberJobsInDepartment(props.department) })
                    <div className="fa fa-angle-down panel-heading__arrow"></div>
                </button>
            </h3>
            <ul className="panel-body" hidden={isOpen ? false : 'hidden'}>
                {
                    props.selectedOffice.jobs.map(job => {
                        if (job.departments[0].name === props.department) {
                            return (
                                <JobPosition key={job.id} job={job}></JobPosition>
                            )
                        }
                    })
                }
                { props.children }
            </ul>
        </li>
    )
}

export default JobDepartment;