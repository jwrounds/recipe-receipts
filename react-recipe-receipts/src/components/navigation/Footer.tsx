import React from 'react';

const Footer = (): JSX.Element => {
    const date = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>© {date} Recipe Receipts</p>
        </footer>
    )
}

export default Footer;