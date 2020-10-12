import React from 'react';

const Header = ({ course }) => {
    return (
      <h1 >{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const parts = course.parts.map(exercise => exercise.exercises)
    const sum = parts.reduce((acc, curr) =>
    {
      return acc + curr
    }, 0)
  
    
    return(
      <h4>Number of exercises {sum}</h4>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises} 
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      course.parts.map( item => <Part key={item.id} part={item}/> )
    )
  }
  
  const Course = ({courses}) => {
    return(
  
      courses.map( item => 
      <div key={item.id}> 
      <Header course={item}/> 
       <Content  course={item} />
       <Total  course={item} />
      </div>)
  
  
    )
  }


  export default Course;