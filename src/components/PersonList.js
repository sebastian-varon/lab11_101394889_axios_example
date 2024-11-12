import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

class PersonList extends Component {
    state = {
        persons: []
    };

    componentDidMount() {
        axios.get(`https://randomuser.me/api/?results=10`)
            .then(res => {
                console.log(res.data);
                const persons = res.data.results;
                this.setState({ persons });
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    render() {
        return (
            <Container>
                <Row>
                    {this.state.persons.map((person, index) => (
                        <Col key={index} xs={12} md={6} lg={4}>
                            <Card className="mb-4">
                                <Card.Img variant="top" src={person.picture.medium} />
                                <Card.Body>
                                    <Card.Title>{person.name.first} {person.name.last}</Card.Title>
                                    <Card.Text>
                                        <strong>Email:</strong> {person.email}
                                        <br />
                                        <strong>Location:</strong> {person.location.city}, {person.location.country}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default PersonList;