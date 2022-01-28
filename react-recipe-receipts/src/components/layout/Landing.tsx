import React from 'react';
import Header from './Header';
import TitleCard from '../content/TitleCard';

const Landing = (): JSX.Element => {
    return (
        <>
            <Header />
            <TitleCard title="Recipe Receipts" tagline="What will you eat today?"/>
        </>
    )
}

export default Landing;