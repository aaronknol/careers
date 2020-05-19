import React, { useEffect } from 'react';

function Tool (props) {  
  const [jobs, setJobs] = React.useState([]);
  const [offices, setOffices] = React.useState([{ name: "All offices", jobs: [], departments: [] }, { name: "London", jobs: [], departments: [] }, { name: "Melbourne", jobs: [], departments: [] }, { name: "New York", jobs: [], departments: [] }, { name: "San Francisco", jobs: [], departments: [] }]);
  const [selectedOffice, setSelectedOffice] = React.useState();
  const [departmentsAtSelectedOffice, setDepartmentsAtSelectedOffice] = React.useState([]);
  const [jobsAtSelectedOffice, setJobsAtSelectedOffice] = React.useState(["hi"]);
  // const [departments, setDepartments] = React.useState(['engineering', 'sales']);
  var jobAPI = 'https://boards-api.greenhouse.io/v1/boards/cultureamp/jobs?content=true';

  const useFetch = () => {
    const test = fetch(jobAPI)
    .then(response => response.json())
    .then(data => {
        setJobs(data.jobs);
    });
  }

  React.useEffect( () => {
    if (jobs.length) {
        /*
            loop through offices and assign the jobs that have the same location as the office name to the office
        */
        for (let i = 0; i < offices.length; i++) {
            offices[i].jobs = jobs.filter(function(job) {
                return job.location.name.includes(offices[i].name);
            });
        }
        
        // set the 'All offices' job to have all jobs
        offices[0].jobs = jobs;
        

        /*
            loop through all the offices, and all the jobs in each office, to find the departments
        */
        for (let i = 0; i < offices.length; i++) {
            for (let j = 0; j < offices[i].jobs.length; j++) {
                if (!offices[i].departments.includes(offices[i].jobs[j].departments[0].name)) {
                    offices[i].departments.push(offices[i].jobs[j].departments[0].name)
                }
            }
        }

        // sort the departments alphabetically
        for (let i = 0; i < offices.length; i++) {
            offices[i].departments = offices[i].departments.sort()
        }
        
        setOffices(offices);
        setSelectedOffice(offices[0])
    }
      
  }, [jobs])

  React.useEffect( () => {
      useFetch();
  }, []);

  if (!selectedOffice) return null
  return <div>{ props.children }</div>
}

export default Tool;