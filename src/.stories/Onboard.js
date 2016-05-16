import React from 'react';
import * as Mdl from 'react-mdl';
import { storiesOf, action } from '@kadira/storybook';
import { Onboard } from '../index';

storiesOf('Onboard', module)
  .add('Default behavior', () => <Onboard />)
  .add('2 slides', () => {
    const props = {
      slides: [
        <div>Page 1</div>
        ,
        <div>
          Page 2
          <div>
            <Mdl.Button colored onClick={action('start')}>Let's get started!</Mdl.Button>
          </div>
        </div>
      ],
    };
    return <Onboard {...props} />;
  })
;
