import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { App, assets } from '../index';

const { avatar } = assets;

storiesOf('App', module)
  .add('title', () => {
    const props = {
      title: 'App',
    };
    return <App {...props} />;
  })
  .add('menuItems, onClickMenuItem', () => {
    const props = {
      menuItems: ['item 1', 'item 2'],
      onClickMenuItem: action('onClickMenuItem')
    };
    return <App {...props} />;
  })
  .add('search', () => {
    const props = {
      search: true,
      onSearch: action('onSearch')
    };

    return <App {...props} />;
  })
  .add('drawer', () => {
    const props = {
      links: [
        { id: 1, text: 'link 1' },
        { id: 2, text: 'link 2' },
        { id: 3, text: 'link 3' },
      ],
      onClickLink: action('onClickLink'),
    };

    return <App {...props} />;
  })
  .add('back', () => {
    const props = {
      onClickBack: action('onClickBack'),
    };

    return <App {...props} />;
  })
  .add('content', () => <App content="content" />)
  .add('fab', () => {
    const props = {
      fab: 'add',
      onClickFab: action('onClickFab'),
    };
    return <App {...props} />;
  })
  .add('profile', () => {
    const props = {
      links: [
        { id: 1, text: 'link 1' },
        { id: 2, text: 'link 2' },
        { id: 3, text: 'link 3' },
      ],
      onClickLink: action('onClickLink'),

      avatar,
      avatarName: 'bob',
      avatarTitle: 'is alive!',
      avatarActions: [
        { id: 'login', text: 'Login' },
        { id: 'profile', text: 'Profile' },
        { id: 'logout', text: 'Logout' },
      ],
      onClickAvatarAction: action('onClickAvatarAction'),
    };
    return <App {...props} />;
  })
  .add('snackbar', () => {
    const props = {
      title: 'Snackbar',

      snackbar: 'Hello snackbar',
      snackbarAction: 'Redo',
      onSnackbarAction: action('Clicked "Redo" action')
    };
    
    return <App {...props} />;
  })
  .add('toast', () => {
    const props = {
      title: 'Toast',

      snackbar: 'Hello toast (just wait, i\'ll go away)'
    };

    return <App {...props} />;
  })
  .add('all together', () => {
    const props = {
      title: 'App',

      search: true,
      onSearch: action('onSearch'),

      menuItems: ['item 1', 'item 2'],
      onClickMenuItem: action('onClickMenuItem'),

      links: [
        { id: 1, text: 'link 1' },
        { id: 2, text: 'link 2' },
        { id: 3, text: 'link 3' },
      ],
      onClickLink: action('onClickLink'),

      avatar,
      avatarName: 'bob',
      avatarTitle: 'is alive!',
      avatarActions: [
        { id: 'login', text: 'Login' },
        { id: 'profile', text: 'Profile' },
        { id: 'logout', text: 'Logout' },
      ],
      onClickAvatarAction: action('onClickAvatarAction'),

      fab: 'add',
      onClickFab: action('onClickFab'),

      content: 'Application content...',
    };
    return <App {...props} />;
  })
;
