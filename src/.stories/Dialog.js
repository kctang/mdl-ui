import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Dialog } from '../index';

storiesOf('Dialog', module)
  .add('Default behavior', () => <Dialog
    title="Hello"
    content="World..."
    actions={['Okay', 'Not Okay']}
    doCancel={action('cancel')}
    doClick={action('click')}
  />)
;
