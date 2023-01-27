import React from "react";
import Map from "./Map";
import Locations from "./Locations";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";

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
        e.preventDefault();

        let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`)
        console.log(response);

        this.setState({
            displayInfo: true,
            cityData: response.data[0]
        }
        )
    }

    render() {
        return (
            <>
                <Container>
                    <Form>
                        <Form.Group>
                            <Form.Label>Enter City</Form.Label>
                            <Form.Control type="text" placeholder="Enter Here" onInput={this.handleSearchInput} />
                        </Form.Group>
                        <Button onClick={this.displaySearch}>Explore!</Button>
                    </Form>
                </Container>

                {this.state.displayInfo &&
                    <>
                        <h2>{this.state.cityData.display_name}</h2>
                        <p>Latitude:{this.state.cityData.lat} Longitude:{this.state.cityData.lon}</p>
                    </>
                }
            </>
        )
    }
}

export default Main;