import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import * as Mdl from 'react-mdl';
import { App, assets } from '../index';

storiesOf('assets', module)
  .add('images', () => {
    const props = {
      content: (
        <div>
          <Mdl.Card style={{width: '256px', height: '256px', background: `url(${assets.onboardBg})`, margin: 'auto'}}>
            <Mdl.CardTitle expand>
              <img src={assets.onboardBg} style={{ border: '2px solid red' }}/>
            </Mdl.CardTitle>
            <Mdl.CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
            <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                assets.onboardBg
            </span>
            </Mdl.CardActions>
          </Mdl.Card>

          <Mdl.Card style={{width: '256px', height: '256px', background: `url(${assets.onboardBg})`, margin: 'auto'}}>
            <Mdl.CardTitle expand>
              <img src={assets.avatar} style={{ width: 128, border: '2px solid red' }}/>
            </Mdl.CardTitle>
            <Mdl.CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
            <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                assets.avatar
            </span>
            </Mdl.CardActions>
          </Mdl.Card>
        </div>
      ),
      title: 'Assets in mdl-ui',
    };

    return <App {...props} />;
  })
;
