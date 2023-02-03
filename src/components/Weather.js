import React from "react";

class Weather extends React.Component {
    render() {
        console.log(this.props.weatherInfo);
        return (


            this.props.weatherInfo.map((item, idx) => (

                <div key={idx}>
                    <p>{item.date}</p>
                    <p>{item.description}</p>
                </div>

            ))


        )
    }
}

export default Weather;