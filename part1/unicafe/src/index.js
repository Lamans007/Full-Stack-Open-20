import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({clicks}) => {
  if(clicks.good === 0 && clicks.neutral === 0 && clicks.bad === 0) return <p>No feedback given</p>
  return(
  <table>
    <thead><tr><th><h3>Statistics</h3></th></tr></thead>
  <tbody>
  <Statistic text='Good' value={clicks.good}/>
  <Statistic text='Bad' value={clicks.bad}/>
  <Statistic text='Neutral' value={clicks.neutral}/>
  <Statistic text='All' value={clicks.all}/>
  <Statistic text='average' value={clicks.average}/>
  <Statistic text='positive' value={clicks.positive}/>
  </tbody>
  </table>
  )
}

const Button = ({handler, text}) => {
  return <button onClick={handler}>{text}</button>
}

const Statistic = ({text, value}) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, positive: 0, average: 0
  })

  
  const handleGood = () => {
    let good =  clicks.good + 1
    let neutral= clicks.neutral
    let bad = clicks.bad
    let all = good + neutral + bad
    let average = (good - bad) / all
    const newClick = {
      good: good,
      neutral: neutral,
      bad: bad,
      all: all,
      average: average,
      positive: good / all * 100
    }
    setClicks(newClick)
  }

  const handleNeutral = () => {
      let good =  clicks.good 
      let neutral= clicks.neutral + 1
      let bad = clicks.bad
      let all = good + neutral + bad
      let average = (good - bad) / all 
      const newClick = {
        good: good,
        neutral: neutral,
        bad: bad,
        all: all,
        average: average,
        positive: good / all * 100
    }
    setClicks(newClick)
  }

  const handleBad = () => {
    let good =  clicks.good
    let neutral= clicks.neutral
    let bad = clicks.bad + 1
    let all = good + neutral + bad
    let average = (good - bad) / all
    const newClick = {
      good: good,
      neutral: neutral,
      bad: bad,
      all: all,
      average: average,
      positive: good / all * 100
    }
    setClicks(newClick)
  }


  return (
    <div>
      <h1>Leave a feedback</h1>
      <Button handler={handleGood} text='good'/>
      <Button handler={handleNeutral} text='Neutral'/>
      <Button handler={handleBad} text='Bad'/>
      <Statistics clicks={clicks}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

