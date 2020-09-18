// import React along with the react hooks that we will be ulitalizing
import React, { useState, useEffect } from 'react'
// bring in the css file from the react-table-v6 package
import 'react-table-v6/react-table.css'
// bring in axios
import axios from 'axios'
// bring in our react table package
import ReactTable from 'react-table-v6'


const App = () => {

  // hook in our use state and pass it an object with an empty array called employees, and an array of columns to reflec the data of our employees
  const [employeeState, setEmployeeState] = useState({
    employees: [],
    columns: [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Phone',
        accessor: 'phone'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Age',
        accessor: 'age'
      },
      {
        Header: 'Gender',
        accessor: 'gender'
      },
    ]
  })


  // use useEffect to fire this axios request when the page loads
  useEffect(() => {
    axios.get('https://randomuser.me/api?results=20')
    .then(({data}) => {
      console.log(data.results)

      
      // when we get our employee data, we map each element in the array of employees into objects with keys that match the names of the columns we created
      let employees = data.results.map(employee => ({
        name: employee.name.first + ' ' + employee.name.last,
        email: employee.email,
        phone: employee.phone,
        age: employee.dob.age,
        gender: employee.gender
      }))

      // now we set the setEmployeeState, and give it the array of employee objects
      setEmployeeState({ ...employeeState, employees})

    })
    .catch(err => console.error(err))
  }, [])

  // retrun our markup
  return(
    // here we use the ReactTable component and feed it data and columns with are coming from our employeeState
    <ReactTable
      data={employeeState.employees}
      columns={employeeState.columns}
    />
  )
}

export default App