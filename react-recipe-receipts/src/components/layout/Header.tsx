import React from 'react';
import headerImgOne from '../../images/toa-heftiba-oQvESMKUkzM-unsplash.jpeg';
import headerImgTwo from '../../images/icons8-team-seDjj4dmC9s-unsplash.jpg';
import headerImgThree from '../../images/fernando-andrade-sEi3apr6Vys-unsplash.jpg';
import '../../App.css';

const Header = (): JSX.Element => {
  return (
    <div className="header">
      <div className="header-img-container">
        <img className="header-img-1" src={headerImgOne} alt="A pan, herbs and spices."></img>
        <img className="header-img-3" src={headerImgThree} alt="A block of ramen noodles."></img>
        <img className="header-img-2" src={headerImgTwo} alt="Pots, pans, and vegetables."></img>
      </div> 
    </div>  
  )
}

export default Header;