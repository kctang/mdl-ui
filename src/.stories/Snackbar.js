import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Snackbar } from '../index';

storiesOf('Snackbar', module)
  .add('snackbar', () => {
    const props = {
      snackbar: 'Hello snackbar',
      snackbarAction: 'Redo',
      onSnackbarAction: action('Clicked "Redo" action')
    };
    
    return <Snackbar {...props} />;
  })
  .add('toast', () => {
    const props = {
      snackbar: 'Hello toast (just wait, i\'ll go away)'
    };

    return <Snackbar {...props} />;
  })
;
