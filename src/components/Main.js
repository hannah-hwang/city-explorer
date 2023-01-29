import React from "react";
import Map from "./Map";
import { Button, Container, Form, Modal } from "react-bootstrap";
import axios from "axios";
import "../App.css";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayInfo: false,
            city: '',
            cityData: {},
            errorModal: false
        }
    }

    handleSearchInput = e => {
        let cityName = e.target.value;
        this.setState({
            city: cityName
        })
    }

    displaySearch = async (e) => {
        try {
            e.preventDefault();

            let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`)


            this.setState({
                displayInfo: true,
                cityData: response.data[0]
            })
        }
        catch (error) {
            this.setState({
                errorModal: true
            })
        }

    }
    closeErrorModal = () => {
        this.setState({
            errorModal: false
        });
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
}

export default Main;