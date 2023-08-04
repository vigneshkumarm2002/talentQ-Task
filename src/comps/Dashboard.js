import React, { useState } from 'react';
import './Dashboard.css';
import data from './../jsonData.json';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Dashboard = () => {
  const { bannerArray, sectionArray, cardArray } = data;

  const [showAllCards, setShowAllCards] = useState(false);

  const [currentBanner, setCurrentBanner] = useState(0);




  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleShowAllCards = (sectionId) => {
    setShowAllCards((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };





  return (
    <div className="dashboard">
      <div className="banner-carousel">
        <Slider {...settings}>
          {bannerArray.map((banner, index) => (
            <div
          
              key={banner.id}
              className={`banner banner-${index} ${index === currentBanner ? 'active' : ''}`}
              
            >
              <div className="banner-content">
                <p>{banner.text}</p>

                {banner.button && <button><a href={banner.link}>{banner.btn_name}</a>   </button>}

              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="sections">
        {sectionArray.map((section) => (
          <div key={section.id} className={`section ${section.cN}`}>
            <h2>{section.title}</h2>
            <div className="cards">
              {cardArray
                .filter((card) => card.parent_sec === section.id)
                .slice(0, showAllCards[section.id] ? cardArray.length : 3)
                .map((card) => (
                  <div key={card.id} className="card">
                    <h3>{card.card_title}</h3>
                    {card.data && card.data_type === 'progress' && (
                      <div className="progress-bar" style={{ width: '80%', backgroundColor: '#f0f0f0' }}>
                        <div
                          className="progress-inner"
                          style={{
                            width: `${card.data_value}%`,
                            backgroundColor: '#3498db',
                            borderRadius: '5px',
                            height: '20px',
                          }}
                        >{card.data_value}%</div>
                      </div>
                    )}


                    {card.data && card.data_type === 'number' && <p>Value: {card.data_value}</p>}
                    {card.data && card.data_type === 'text' && <p>{card.data_value}</p>}
                    {card.data && card.data_type === 'tags' && (
                      <ul>
                        {card.data_value.map((tag, index) => (
                          <li key={index}>{tag}</li>
                        ))}
                      </ul>
                    )}
                    {card.data && card.data_type === 'image' && (
                      <img src={card.data_value} alt={`Image for ${card.card_title}`} />
                    )}
                    {card.button && <button>{card.button_name}</button>}
                    {card.link && <button><a href={card.redirect}>{card.link_name}</a></button> }
                    {card.note && <p>{card.note}</p>}
                  </div>
                ))}
            </div>
            {cardArray.filter((card) => card.parent_sec === section.id).length > 3 && (
              <div className="show-cards-button">
                {showAllCards[section.id] ? (
                  <button className='showButton' onClick={() => handleShowAllCards(section.id)}>Show Less</button>
                ) : (
                  <button className='showButton' onClick={() => handleShowAllCards(section.id)}>Show More</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
