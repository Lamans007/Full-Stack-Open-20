import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Display = ({filteredData, allData, showDetails, handleShowMore}) =>{
  

  if(filteredData.selCountries && filteredData.selCountries.length > 10){
  return(
    <h4>You need to be more specific</h4>
  )
  }
  if(filteredData.selCountries && filteredData.selCountries.length === 1){
    return (
      <div>
        <h4>{filteredData.selCountries}</h4>
        <p>Capital: {allData[filteredData.selCountries].capital}</p>
        <p>Population: {allData[filteredData.selCountries].population}</p>
        <h4>Languages:</h4>
        <p>{allData[filteredData.selCountries].languages.map(item => <p>{item.name}</p>)}</p>
        <img src={allData[filteredData.selCountries].flag} width='200' alt='Country Flag'/>
      </div>
    )
  }
  if(filteredData.selCountries && filteredData.selCountries.length < 10){
    return(
      <div>{filteredData.selCountries.map(item => 
      <div>
        <p>{item}</p>
        {showDetails.includes(item) ? 
          <div>
            <p>Capital: {allData[item].capital}</p>
            <p>Population: {allData[item].population}</p>
            <h4>Languages:</h4>
            <div>{
                allData[item].languages.map(item => <p>{item.name}</p>)
              }</div>
            <img src={allData[item].flag} width='200' alt='Country flag'/>
            </div>
          :
          <button value={item} onClick={handleShowMore}>Click</button>
        }
      </div>)}
      </div>
    )
  }
  return(null)
}



function App() {
  const [allCountries, setAllCountries] = useState('')
  const [filteredData, setFilteredData] = useState('')
  const [allData, setAllData] = useState({})
  const [showDetails, setShowmore] = useState('')

 
  const allD = []
  

  const filterChange = (event) => {
    let selectedCountries = allCountries.filter(country =>
      country.toLowerCase().includes(event.target.value))
      const selected = {
        searchString: event.target.value,
        selCountries: selectedCountries
      }
      
    //   selectedCountries = selectedCountries.length < 10 ? selectedCountries : 'huj'
    setFilteredData(selected)
}

const handleShowMore = (event) =>{
  const showName = showDetails ? [...showDetails, event.target.value] : [event.target.value]
  setShowmore(showName)
}

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      response.data.map((item, idx )=> allD[idx]=item.name)
      response.data.map((item)=> allData[item.name]={capital: item.capital, population: item.population, languages: item.languages, flag: item.flag } )
      // console.log(response.data)
      // setAllCountries(allCNames)
      setAllData(allData)
      setAllCountries(allD)

    })
  }, [])




  return (
    <div >
      <label>Search for a country
      <input value={filteredData.searchString} onChange={filterChange}/>
      </label>
      <Display filteredData={filteredData} allData={allData} showDetails={showDetails} handleShowMore={handleShowMore}/>
      
    </div>
  )
}

export default App;
