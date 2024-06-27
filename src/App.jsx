import WeatherApp from "./WeatherApp"

import { useState } from "react";
function App() {
const [info, setInfo] = useState({});
console.log(info);
  return (
    <>
    
      <div>
        
        <WeatherApp info={info} setInfo={setInfo}  />
      </div>
    </>
  )
}

export default App