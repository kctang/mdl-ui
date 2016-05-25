import _ from 'underscore';
import React from 'react';
import * as Mdl from 'react-mdl';
import defaultAvatar from './assets/avatar.png';
import Snackbar from './Snackbar';

// TODO: incomplete solution - keyboard & drag mouse/touch still activates drawer!
class BackDrawer extends React.Component {
  componentDidMount() {
    const { onClickBack } = this.props;
    setTimeout(() => {
      document.querySelector('i.material-icons').textContent = 'arrow_back';
      const handleBack = e => {
        e.preventDefault();
        e.stopPropagation();
        onClickBack();
      };
      const button = document.querySelector('header > .mdl-layout__drawer-button');
      button.addEventListener('click', handleBack, true);
    }, 0);
  }

  render() {
    return (
      <div ref="drawerBack" className="mdl-layout__drawer">
      </div>
    );
  }
}

const AppDrawer = ({
  links,
  onClickLink,
  avatar = defaultAvatar,
  avatarName,
  avatarTitle,
  avatarActions = [],
  onClickAvatarAction,
}) => {
  const clickAvatarAction = onClickAvatarAction;
  const clickLink = onClickLink;

  const css = {
    avatarDiv: {
      display: 'flex',
      padding: 16,
      backgroundColor: '#3F51B5',
      lineHeight: 'normal',
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    name: {
      color: 'white',
      fontSize: 16,
    },
    email: {
      color: 'white',
      fontSize: 12,
    },
    icon: {
      color: 'white',
    },
  };

  if (avatarName || (links && links.length > 0)) {
    const Title = (
      <div style={css.avatarDiv}>
        <img src={avatar} style={css.avatar} alt="Avatar" />
        <div>
          <div style={css.name}>{avatarName}</div>
          <div style={css.email}>{avatarTitle}</div>
        </div>
        <div className="mdl-layout-spacer"></div>
        {avatarActions && avatarActions.length > 0 && (
          <div style={{ position: 'relative' }}>
            <Mdl.IconButton name="arrow_drop_down" id="app-drawer-menu" style={css.icon} />
            <Mdl.Menu target="app-drawer-menu" align="right">
              {avatarActions.map((avatarAction, index) =>
                <Mdl.MenuItem key={index} onClick={() => clickAvatarAction(avatarAction.id)}>{avatarAction.text}</Mdl.MenuItem>
              )}
            </Mdl.Menu>
          </div>
        )}
      </div>
    );

    return (
      <Mdl.Drawer title={Title}>
        {links && links.length > 0 && (
          <Mdl.Navigation>
            {links.map((link, idx) => (
              <a key={idx} onClick={() => clickLink(link.id)}>{link.text}</a>
            ))}
          </Mdl.Navigation>
        )}
      </Mdl.Drawer>
    );
  }
  return null;
};

class AppSearch extends React.Component {
  constructor(props) {
    super(props);
    this.active = props.active;
    this.onSearch = props.onSearch || (val => console.log(`Searching for [${val}]`));
    this.debouncedOnChangeSearch = _.debounce(this.onSearch, 250);

    this.state = {
      search: '',
    };
  }

  delegatingOnChangeSearch(e) {
    this.setState({ search: e.target.value });
    this.debouncedOnChangeSearch.call(this, e.target.value);
  }

  render() {
    const { search } = this.state;

    if (this.active) {
      return (
        <Mdl.Textfield
          value={search}
          // eslint-disable-next-line
          onChange={this.delegatingOnChangeSearch.bind(this)}
          label="Search"
          expandable
          expandableIcon="search"
        />
      );
    }

    return null;
  }
}

const AppMenu = ({
  menuItems = [],
  onClickMenuItem = () => console.log('Menu item clicked'),
}) => {
  const active = menuItems && menuItems.length > 0;

  if (active) {
    return (
      <div style={{ position: 'relative' }}>
        <Mdl.IconButton name="more_vert" id="demo-menu-lower-right" />
        <Mdl.Menu target="demo-menu-lower-right" align="right">
          {menuItems.map((item, idx) =>
            // eslint-disable-next-line
            <Mdl.MenuItem key={idx} onClick={onClickMenuItem.bind(this, item)}>{item}</Mdl.MenuItem>
          )}
        </Mdl.Menu>
      </div>
    );
  }
  return null;
};

export default ({
  title,

  menuItems, onClickMenuItem,

  onClickBack,

  search, onSearch,

  links, onClickLink,
  avatar, avatarName, avatarTitle, avatarActions, onClickAvatarAction,

  content,

  fab, onClickFab,

  snackbar, snackbarAction, onSnackbarAction,
}) => {
  const fabStyle = {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 998,
  };

  return (<div style={{ height: '100%', position: 'relative' }}>
    <Mdl.Layout fixedHeader>
      <Mdl.Header title={title}>
        <div className="mdl-layout-spacer"></div>
        <AppSearch active={search} onSearch={onSearch} />
        <AppMenu {...{ menuItems, onClickMenuItem }} />
      </Mdl.Header>
      {onClickBack ?
        <BackDrawer {...{ onClickBack }} /> :
        <AppDrawer {...{
          links, onClickLink, avatar, avatarName, avatarTitle, avatarActions, onClickAvatarAction
        }} />
      }
      <Mdl.Content>
        {content}
        {fab && <Mdl.FABButton colored ripple style={fabStyle} onClick={onClickFab}>
          <Mdl.Icon name={fab} />
        </Mdl.FABButton>}
      </Mdl.Content>
    </Mdl.Layout>
    <Snackbar {...{ snackbar, snackbarAction, onSnackbarAction }} />
  </div>);
};
