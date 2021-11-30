import React from 'react';

export default function Footer() {
    const date = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>© {date} Recipe Receipts</p>
        </footer>
    )
}