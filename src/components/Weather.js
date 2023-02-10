import React from "react";
import WeatherDay from "./WeatherDay";


class Weather extends React.Component {
    render() {
        return (
            <>
                <h2>Daily Forecast:</h2>
                <ul>
                    {this.props.weatherInfo.map((item, idx) => {
                        return (
                            <WeatherDay
                                key={idx}
                                date={item.date}
                                description={item.description}
                            />
                        )
                    })}
                </ul>
            </>
        )
    }
};


export default Weather;


