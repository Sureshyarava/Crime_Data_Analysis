import React ,{useState} from "react";
// import chart from "../chart.png";
import '../Css/trend.css';
import Plot from "./Plot";


export default function Trend() {
    return (
        <div className="wrapper">
            <div className="sidebar">
                <a href="/dashboard"><h2 style={{ marginTop: "-13%" }}>Dashboard</h2></a>
                <ul>
                    <li><a href="/trend1">Trend 1</a></li>
                    <li><a href="/trend2">Trend 2</a></li>
                    <li><a href="/trend3">Trend 3</a></li>
                    <li><a href="/trend4">Trend 4</a></li>
                    <li><a href="/trend5">Trend 5</a></li>
                    <li><a href="/trend6">Trend 6</a></li>
                </ul>
                <div className="social_media">
                    <a href="\">Logout</a>

                </div>
            </div>
            <div className="main_content">
                <MainPage />
                <footer id="footer" style={{ marginLeft: "20%" }}><p>Disclaimer</p></footer>
            </div>
        </div>
    )
}

function MainPage() {
    const [showInput, setShowInput] = useState(true);
    const [showPlot, setShowPlot] = useState(false);
    const [apiData, setApiData] = useState(null);
  
    const toggleDivs = () => {
      setShowInput(!showInput);
      setShowPlot(!showPlot);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
    //   const dropdownValue = document.getElementById("dropdown").value;
    //   fetch(`https://api.example.com/data?crimeType=${dropdownValue}`)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     
    //     // Store the fetched data in state
    //     setApiData(data1);
    //     // Toggle divs to hide input and show the plot
    //     toggleDivs();
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
    
    let data1 ={
                "x": [1, 2, 3, 4, 5],
                "y": [7, 3, 9, 2, 8]
              };
    setApiData(data1);
    toggleDivs();
    };
  
    return (
      <div>
        <header className="trend">
          <nav>
            <ul className="navbar-trend">
              <li><h1>Trend</h1></li>
            </ul>
          </nav>
        </header>
  
        <div className="content">
          <h1 className="element">Analysis of Trend Data</h1>
          <div className="content-container">
            <div className="inside1" id="input" style={{ display: showInput ? "block" : "none" }}>
              <br />
              <br />
              <form style={{ backgroundColor: "#F3F5F9", display: "flex" }} onSubmit={handleSubmit}>
                <label htmlFor="dropdown">Select the crime type:</label>
                <br />
                <select id="dropdown" name="dropdown">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                <br />
                <input type="submit" value="Submit" style={{ background: "blue", color: "white", borderRadius: "3px" }} />
              </form>
            </div>
            <div className="inside2" id="plot" style={{ display: showPlot ? "block" : "none" , width: "600px"}}>
            <Plot apdata={apiData}/>
            </div>
          </div>
        </div>
      </div>
    );
  }