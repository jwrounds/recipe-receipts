import React from 'react';
import { Container } from 'react-bootstrap';

export default function TitleCard(props) {
    return (
        <Container className="title-card">
            <hr></hr>
            <h1>{props.title}</h1>
            <h2>{props.tagline}</h2>
            <hr></hr>
        </Container>
    )
}