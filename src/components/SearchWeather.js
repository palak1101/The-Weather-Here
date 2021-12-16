import { useState, useEffect } from 'react';
import config from '../config';


const SearchWeather = () => {

    const [search, setSearch] = useState("London");
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    let componentMounted = true;

    const fetchWeather = async () => {
        var appkey = config.MY_APP_ID;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${appkey}`);
        const data = await response.json()
        if (componentMounted) {
            setData(data);
            console.log(data)
        }
        return () => {
            componentMounted = false;
        }
    }


    useEffect(() => {
        fetchWeather();
    }, [search])

    

    let icon = null;
    if (typeof data.main != "undefined") {
        icon = data.weather[0].icon;
    } else {
        return (
            <div>....Loading</div>
        )
    }

   

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input);
    }


    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div class="card text-white text-center border-0">
                            <img src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} class="back-card" alt="..." />
                            <div class="card-img-overlay">

                                <form>
                                    <div class="input-group mb-4 w-75 mx-auto">

                                        <input type="search" class="form-control" placeholder="Search City" name="search" required
                                            value={input} onChange={(e) => setInput(e.target.value)} />

                                        <button onClick={handleSubmit} type="submit" class="input-group-text" id="basic-addon2">
                                            <i className="fas fa-search"></i>
                                        </button>

                                    </div>
                                </form>

                                <div className="bg-dark bg-opacity-50 py-3">
                                    <h2 class="h1 card-title">{data.name}</h2>
                                    
                                    <hr />

                                    <img className="w-icon" src={`http://openweathermap.org/img/wn/${icon}.png`}></img>

                                    <p className="h3 fw-bolder mt-4 mb-4">{data.weather[0].main}</p>
                                    
                                    <div className="temperature">
                                        <h1 className="fw-bolder mb-3">{data.main.temp} &deg;C</h1>
                                        <p className="lead mb-5 fw-bold">Min : {data.main.temp_min} &deg;C | Max : {data.main.temp_max} &deg;C </p>
                                    </div>

                                    <div className="parameters">
                                        <p className="mb-0">Humidity : {data.main.humidity} %</p>
                                        <p className="mb-0">WindSpeed : {data.wind.speed} m/s</p>
                                    </div>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchWeather;
