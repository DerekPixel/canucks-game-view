import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {

  const [NHLSchedule, setNHLSchedule] = useState(null);
  const [games, setGames] = useState([]);
  const [mappedGames, setMappedGames] = useState(null);

  const proxy = 'https://statsapi.web.nhl.com';

  useEffect(() => {
    fetchNewData();
  }, []);

  useEffect(() => {
    if(NHLSchedule === null) return;

    // console.log('hello', NHLSchedule);
    setGames(NHLSchedule.dates[0].games);
  }, [NHLSchedule])

  useEffect(() => {
    if(games.length === 0) return;

    setMappedGames(mapGames());
    // console.log(mapGames());
  }, [games])
  

  async function fetchNewData() {
    try {
      let nhlDataPromise = await makeRequestForNhlDataReturnPromise();
      console.log('Got the NHL Data Promise!', nhlDataPromise);
      let nhlDataJson = await processNhlData(nhlDataPromise);
      console.log('Got the Data Json', nhlDataJson);
      setNHLSchedule(nhlDataJson);
      // setGames(nhlDataJson.dates[0].games);
      
    } catch(error) {
      console.log(error)
    }
  } 

  function makeRequestForNhlDataReturnPromise() {
    return fetch('https://statsapi.web.nhl.com/api/v1/schedule');
  }

  function processNhlData(nhlData) {
    return nhlData.json();
  }

  function mapGames() {
      return games.map((gameObj, index, array) => {
        return (
        <div
          key={index}
        >
          <div className="home">
            <h1>{gameObj.teams.home.team.name}</h1>
          </div>
          <div className="away">
            <h1>{gameObj.teams.away.team.name}</h1>
          </div>
        </div>          
        )

    })
  }

  return (
    <div className="App">
      {
        mappedGames
      }
    </div>
  );
}

export default App;
