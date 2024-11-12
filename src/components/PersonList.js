import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';

class PersonList extends Component {
    state = {
        persons: [],
        loading: true,
        search: ''
    };

    componentDidMount() {
        axios.get(`https://randomuser.me/api/?results=10`)
            .then(res => {
                const persons = res.data.results;
                this.setState({ persons, loading: false });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                this.setState({ loading: false });
            });
    }

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value });
    };

    render() {
        const { loading, persons, search } = this.state;

        const filteredPersons = persons.filter(person => 
            `${person.name.first} ${person.name.last}`.toLowerCase().includes(search.toLowerCase()) ||
            person.location.city.toLowerCase().includes(search.toLowerCase()) ||
            person.location.country.toLowerCase().includes(search.toLowerCase())
        );

        if (loading) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <ClipLoader color="#343a40" size={50} />
                </div>
            );
        }

        return (
            <Container>
                <Form.Group className="mb-4">
                    <Form.Control 
                        type="text" 
                        placeholder="Search by name or location" 
                        value={search} 
                        onChange={this.handleSearchChange} 
                    />
                </Form.Group>
                <Row>
                    {filteredPersons.map((person, index) => (
                        <Col key={index} xs={12} md={6} lg={4}>
                            <Card className="person-card mb-4">
                                <Card.Img variant="top" src={person.picture.large} alt={`${person.name.first} ${person.name.last}`} />
                                <Card.Body>
                                    <Card.Title>{person.name.first} {person.name.last}</Card.Title>
                                    <Card.Text>
                                        <strong>Email:</strong> {person.email}<br />
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