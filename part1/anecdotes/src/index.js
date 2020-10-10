import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
  const [change, setChange] = useState({selected: 0, vote: new Array(props.anecdotes.length).fill(0), maxVotes: 0, highestVote: 0})

  const handleNext = () => {
    const changed = {
      ...change,
      selected : Math.floor(Math.random() * anecdotes.length ),
    }
    setChange(changed)
    
  }

  const handleVote = () => {
    const copy = [...change.vote]
    copy[change.selected] += 1
    let highestVote = Math.max(...copy)
    let maxVotes = copy.indexOf(highestVote)
    const changed = {
      ...change,
      vote: copy,
      maxVotes: maxVotes,
      highestVote: highestVote
    }
    setChange(changed)
  }
 
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[change.selected]}</p>
      <p>has {change.vote[change.selected]} votes</p>
      <button onClick={handleVote}>vote</button>
    <button onClick={handleNext}>next anecdote</button>

    <h3>Anecdote with most votes</h3>
    { props.anecdotes[change.maxVotes] }
    <p>has {change.highestVote} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)