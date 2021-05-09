import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {

  const [NHLSchedule, setNHLSchedule] = useState();
  const [games, setGames] = useState([]);

  const proxy = 'https://statsapi.web.nhl.com';

  useEffect(() => {
    fetch('https://statsapi.web.nhl.com/api/v1/schedule')
    .then(res => res.json())
    .then(
      (results) => {
        // console.log(results.dates);
        setNHLSchedule(results.dates);
      },

      (error) => {
        console.log(error);
      }
    )
  }, [])

  useEffect(() => {

  if(NHLSchedule !== undefined) {

    Promise.all(
      NHLSchedule[0].games.map((gameObj, i) => {

        return (
          fetch(`${proxy}${gameObj.teams.home.team.link}`)
          .then(res => res.json())
          .then(
            (results => {
              return (
                <div
                  key={i}
                >
                  {results.teams[0].abbreviation}
                </div>
              )
            }),
      
            (error) => {
              console.log(error);
            }
          )
        )
  
      })
    ).then(value => {
      setGames(value)
    })
  }

  }, [NHLSchedule])



  return (
    <div className="App">
      {games}
    </div>
  );
}

export default App;
