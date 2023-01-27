import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "../App.css";
import { Container } from "react-bootstrap";

class App extends React.Component {
    render() {
        return (
            <Container className="pageRender">
                <Header />
                <Main />
                <Footer />
            </Container>
        )
    }
}

export default App;
