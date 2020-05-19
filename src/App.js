import React, { useEffect } from 'react';
import logo from './logo.svg';
import Section from './Components/Section';
import Container from './Components/Container';
import Dropdown from './Components/Dropdown';
import DepartmentList from './Components/DepartmentList';
import './App.css';


function App() {

  const [jobs, setJobs] = React.useState([]);
  const [offices, setOffices] = React.useState([{ name: "All offices", jobs: [], departments: [] }, { name: "London", jobs: [], departments: [] }, { name: "Melbourne", jobs: [], departments: [] }, { name: "New York", jobs: [], departments: [] }, { name: "San Francisco", jobs: [], departments: [] }]);
  const [selectedOffice, setSelectedOffice] = React.useState();
  const [departmentsAtSelectedOffice, setDepartmentsAtSelectedOffice] = React.useState([]);
  const [jobsAtSelectedOffice, setJobsAtSelectedOffice] = React.useState(["hi"]);
  // const [departments, setDepartments] = React.useState(['engineering', 'sales']);
  var jobAPI = 'https://boards-api.greenhouse.io/v1/boards/cultureamp/jobs?content=true';


  const getjobs = () => {
    const test = fetch(jobAPI)
    .then(response => response.json())
    .then(data => {
        setJobs(data.jobs);
    });
  }

  React.useEffect( () => {
    if (jobs.length) {console.log('in here')
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
        console.log('it is: ', offices[0])
        setSelectedOffice(offices[0])
    }
    
}, [jobs])

  React.useEffect( () => {
      getjobs();
  }, []);

  if (!selectedOffice) return null
  return (
    <div className="App">
      <Section className={"browse-positions"}>
        <Container>
          <h1>Careers</h1>
          <h2>
            <span className="browse-positions__heading-text">
                { selectedOffice.jobs.length + ' ' }
                open positions in 
            </span>
            <Dropdown offices={offices} setSelectedOffice={setSelectedOffice} selectedOffice={selectedOffice}>
            </Dropdown>
          </h2>
        </Container>
        <DepartmentList selectedOffice={selectedOffice}>
        </DepartmentList>
      </Section>
    </div>
  );
}

export default App;
