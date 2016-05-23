import React from 'react';
import * as Mdl from 'react-mdl';
import Carousel from 'nuka-carousel';
import onboardBackground from './assets/onboard-bg.png';

const CarouselDecorators = [
  {
    component: React.createClass({
      render() {
        var self = this;
        var indexes = this.getIndexes(self.props.slideCount, self.props.slidesToScroll);
        return (
          <ul style={self.getListStyles()}>
            {
              indexes.map(function (index) {
                return (
                  <li style={self.getListItemStyles()} key={index}>
                    <button
                      style={self.getButtonStyles(self.props.currentSlide === index)}
                      onClick={self.props.goToSlide.bind(null, index)}>
                      &bull;
                    </button>
                  </li>
                )
              })
            }
          </ul>
        )
      },
      getIndexes(count, inc) {
        var arr = [];
        for (var i = 0; i < count; i += inc) {
          arr.push(i);
        }
        return arr;
      },
      getListStyles() {
        return {
          position: 'relative',
          margin: 0,
          top: -10,
          padding: 0
        }
      },
      getListItemStyles() {
        return {
          listStyleType: 'none',
          display: 'inline-block'
        }
      },
      getButtonStyles(active) {
        return {
          border: 0,
          background: 'transparent',
          color: 'black',
          cursor: 'pointer',
          padding: 10,
          outline: 0,
          fontSize: 24,
          opacity: active ? 1 : 0.5
        }
      }
    }),
    position: 'BottomCenter'
  }
];
const css = {
  image: {
    width: 256,
    height: 256,
    borderRadius: '20%',
  },
  text: {},
};
const DefaultSlides = [
  <div>
    <img style={css.image} src="http://lorempixel.com/200/200/people" />
    <div style={css.text}>Step 1...</div>
  </div>
  ,
  <div>
    <img style={css.image} src="http://lorempixel.com/200/200/city" />
    <div style={css.text}>Step 2...</div>
  </div>
  ,
  <div>
    <img style={css.image} src="http://lorempixel.com/200/200" />
    <div style={css.text}>Done.</div>
    <Mdl.Button colored>Let's get started!</Mdl.Button>
  </div>
];

export default ({
  backgroundImage = onboardBackground,
  slides = DefaultSlides,
}) => {
  const css = {
    page: {
      background: `url('${backgroundImage}') repeat`,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    carousel: {
      height: '100%',
    },
    slide: {
      height: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (<div style={css.page}>
    <Carousel decorators={CarouselDecorators}>
      {slides.map((Slide, index) => (
        <div key={index} style={css.slide}>{Slide}</div>
      ))}
    </Carousel>
  </div>);
};
