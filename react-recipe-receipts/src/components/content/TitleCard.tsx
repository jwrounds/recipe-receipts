import React from 'react';
import { Container } from 'react-bootstrap';

type TitleCardProps = {
  title: string;
  tagline: string;
}

const TitleCard = ({ title, tagline }: TitleCardProps): JSX.Element => {
    return (
        <Container className="title-card">
            <hr></hr>
            <h1>{title}</h1>
            <h2>{tagline}</h2>
            <hr></hr>
        </Container>
    )
}

export default TitleCard;