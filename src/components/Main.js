import React from "react";
import Map from "./Map";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import "../App.css";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayInfo: false,
            city: '',
            cityData: {}
        }
    }

    handleSearchInput = e => {
        let cityName = e.target.value;
        this.setState({
            city: cityName
        })
    }

    displaySearch = async (e) => {
        // try{
        e.preventDefault();

        let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`)


        this.setState({
            displayInfo: true,
            cityData: response.data[0]
        }
        )
        // }
        // catch(error){

        // }
    }

    render() {
        return (
            <main>
                <Container>
                    <Form className="cityForm">
                        <Form.Group>
                            <Form.Label>Enter City: </Form.Label>
                            <Form.Control type="text" placeholder="Enter Here" onInput={this.handleSearchInput} />
                        </Form.Group>
                        <Button onClick={this.displaySearch} className="cityButton">Explore!</Button>
                    </Form>
                </Container>

                {this.state.displayInfo &&
                    <>
                        <h2>{this.state.cityData.display_name}</h2>
                        <p>Latitude:{this.state.cityData.lat} Longitude:{this.state.cityData.lon}</p>
                        <Map lat={this.state.cityData.lat} lon={this.state.cityData.lon} />
                    </>
                }
            </main>
        )
    }
}

export default Main;