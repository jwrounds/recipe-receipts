import React from 'react';
import Header from './Header';
import TitleCard from './TitleCard';

export default function Landing() {
    return (
        <>
            <Header />
            <TitleCard title="Recipe Receipts" tagline="What will you eat today?"/>
        </>
    )
}