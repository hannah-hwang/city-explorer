import React from "react";

class WeatherDay extends React.Component {
    render() {
        return (
            <div>
                <h3>Date:</h3>
                <p>{this.props.date}</p>
                <h3>Forecast:</h3>
                <p>{this.props.description}</p>
            </div>
        )
    }
};

export default WeatherDay;