import React, {FC} from 'react';
import {FooterWrapper} from './Footer.styled';
import './Footer.css';

// interface FooterProps {}

const Footer: FC = () => (
    <>
        <footer className="footer">

            <ul>
                <a href="/over" className="footer-link">
                    {'>'} &nbsp; deze website
                </a>
                <a href="mailto:steven.gort@ictu.nl" className="footer-link">
                    {'>'} &nbsp; Contact
                </a>
                <a href="https://github.com/MinBZK/regels.overheid.nl" className="footer-link">
                    {'>'} &nbsp; Github
                </a>
                <a href="https://regels.dexcat.nl/" className="footer-link">
                    {'>'} &nbsp; Regelregister
                </a>
            </ul>
            <ul>
                <a href="https://regels.overheid.nl/docs" className="footer-link">
                    {'>'} &nbsp; Documentatie
                </a>
                <a href="#" className="footer-link">
                    {'>'} &nbsp; Privacy en cookies
                </a>
                <a href="#" className="footer-link">
                    {'>'} &nbsp;  Toegankelijkheid
                </a>
                <a href="/sitemap.xml" className="footer-link">
                    {'>'} &nbsp;  Sitemap
                </a>
            </ul>
            <ul>
                <a href="/methoden" className="footer-link">
                    {'>'} &nbsp;   Methoden
                </a>
                <a href="https://www.overheid.nl/" className="footer-link">
                    {'>'} &nbsp;  Overheid.nl
                </a>
                <a href="https://linkeddata.overheid.nl/front/portal/" className="footer-link">
                    {'>'} &nbsp;  Linked Data Overheid
                </a>
                <a href="https://puc.overheid.nl/mijno" className="footer-link">
                    {'>'} &nbsp; PUC Open Data
                </a>
            </ul>
            <ul>
                <a href="https://mijn.overheid.nl/" className="footer-link">
                    {'>'} &nbsp;  MijnOverheid.nl
                </a>
                <a href="https://www.rijksoverheid.nl/" className="footer-link">
                    {'>'} &nbsp;  Rijksoverheid.nl
                </a>
                <a href="https://ondernemersplein.kvk.nl/" className="footer-link">
                    {'>'} &nbsp;   Ondernemersplein
                </a>
                <a href="https://www.werkenbijdeoverheid.nl/" className="footer-link">
                    {'>'} &nbsp; Werkenbijdeoverheid
                </a>
            </ul>
        </footer>
    </>
);

export default Footer;
