
import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [initialCountries, setInitialCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  async function getCountries() {
    let { data } = await axios.get('https://restcountries.com/v3.1/all');
    setCountries(data);
    setInitialCountries(data);
    console.log(data);
    
  }


  useEffect(() => {
    getCountries();
  }, [])

  useEffect(() => {
    let filteredCountries = initialCountries.filter((country) => country.name.common.toLowerCase().includes(searchInput.toLowerCase()));
    setCountries(filteredCountries);
  }, [searchInput])


  return (
    <>
      <div className='container mt-10 overflow-hidden m-auto'>
        <h1 className='text-center text-5xl font-bold my-5'>Know Your Country</h1>
        <div className='flex justify-center'>
          <input className='border-2 border-gray-300 p-2 rounded-lg w-1/2' type="text" placeholder='search for country' onChange={(e) => setSearchInput(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-5 justify-center items-center my-12">
          {
            countries.map((country, key) =>
              <div className='col-md-3 rounded-2xl ' key={key}>
                <div className="card bg-gray-100 rounded-2xl h-100 pb-5 mb-5  shadow-md hover:shadow-2xl hover:cursor-pointer">
                  <img src={country.flags.png ==="https://flagcdn.com/w320/il.png"?"https://flagcdn.com/w320/ps.png":country.flags.png} className="card-img-top w-[100%] h-40 rounded-t-2xl " alt="..." />
                  <div className="card-body rounded-2xl ms-4 mt-4 pb-4">
                    <h5 className="card-title text-2xl font-bold"> {country.name.common==="Israel"?"Free Palestine":country.name.common}</h5>
                    <p className="card-text text-2xl w-70 line-clamp-2"><span className='font-bold'>Capital:</span> {country.capital==='Jerusalem'?'AlQuds':country.capital}</p>
                    <p className="card-text text-2xl"><span className='font-bold'>{country.population}</span> pepole</p>
                    <p className="card-text text-2xl line-clamp-1 w-80"><span className='font-bold'>timezones</span> {country.timezones}</p>
                    <p className='card-text text-2xl'>({country.translations.ara.common==='إسرائيل'?'فلسطين':country.translations.ara.common})</p>
                    <p className="card-text text-2xl"><span className='font-bold'>region:</span> {country.region}</p>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
