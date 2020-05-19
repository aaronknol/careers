import React from 'react';

function JobPosition ({ job }) {
    return (
        <li className="job-listing">
            <a href={job.absolute_url} className="job-listing__link">
                <span className="job-listing__title-location">
                    <span className="job-listing__title">
                        {job.title}
                    </span>
                    <span className="job-location">{job.location.name}</span>
                </span>
                <span className="job-listing__apply">
                    Apply
                    <svg className="job-listing__apply-arrow" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6 0.216797L4.9425 1.2743L9.1275 5.4668H0V6.9668H9.1275L4.9425 11.1593L6 12.2168L12 6.2168L6 0.216797Z" fill="#F3786D"></path></svg>
                </span>
            </a>
        </li>
    )
}

export default JobPosition