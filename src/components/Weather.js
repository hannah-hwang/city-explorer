import React from "react";

class Weather extends React.Component {
    render() {
        console.log(this.props.weatherInfo);
        return (
            <>
                <ul>
                    {this.props.weatherInfo.map((item, idx) => {
                        return (

                            <li key={idx}>
                                <p>{item.date}</p>
                                <p>{item.description}</p>
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }
};


export default Weather;


