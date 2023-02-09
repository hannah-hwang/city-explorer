import React from "react";
import Map from "./Map";
import Weather from "./Weather";
import Movies from "./Movies";
import { Button, Container, Form, Modal } from "react-bootstrap";
import axios from "axios";
import "../App.css";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayInfo: false,
            errorModal: false,
            city: '',
            cityData: {},
            weatherInfo: [],
            weatherLat: '',
            weatherLon: '',
            movieInfo: []
        }
    };

    handleSearchInput = e => {
        let cityName = e.target.value;
        this.setState({
            city: cityName
        })
    };

    displayWeather = async (lat, lon) => {
        try {
            let serverResponse = await axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`);
            this.setState({
                weatherInfo: serverResponse.data,
            })
        }

        catch (error) {
            this.setState({
                errorModal: true
            })
        }
    };

    displayMovies = async () => {
        try {
            let movieResponse = await axios.get(`${process.env.REACT_APP_SERVER}/movies?city=${this.state.city}`);
            this.setState({
                movieInfo: movieResponse.data
            })
        }
        catch (error) {
            this.setState({
                errorModal: true
            })
        }
    };

    displaySearch = async (e) => {
        try {
            e.preventDefault();

            let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
            console.log(response.data);
            let lat = response.data[0].lat;
            let lon = response.data[0].lon;
            this.setState({
                displayInfo: true,
                cityData: response.data[0],
                weatherLat: lat,
                weatherLon: lon
            })
            this.displayWeather(lat, lon);
            this.displayMovies();
        }
        catch (error) {
            this.setState({
                errorModal: true
            })
        }

    };


    closeErrorModal = () => {
        this.setState({
            errorModal: false
        });
    };

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
                        <Weather weatherInfo={this.state.weatherInfo} />
                        <div>
                            {this.state.movieInfo.length > 0 &&
                                <Movies movieInfo={this.state.movieInfo} />
                            }
                        </div>
                    </>
                }

                <Modal
                    show={this.state.errorModal}
                    onHide={this.closeErrorModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>☹︎You've entered an invalid response. Please try again.☹︎</p>
                    </Modal.Body>
                </Modal>
            </main>

        )
    }
};

export default Main;