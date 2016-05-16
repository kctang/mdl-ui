import React from 'react';
import * as Mdl from 'react-mdl';

export default class Snackbar extends React.Component {
  constructor(props) {
    super(props);
    this.hideSnackbar = this.hideSnackbar.bind(this);
    this.state = {
      snackbarActive: false,
    };
  }

  componentDidMount() {
    if (this.props.snackbar) {
      this.setState({ snackbarActive: true });
    }
  }

  hideSnackbar() {
    this.setState({ snackbarActive: false });
  }

  render() {
    const { snackbarActive } = this.state;
    const { snackbar, snackbarAction, onSnackbarAction } = this.props;

    return (
      <Mdl.Snackbar
        active={snackbarActive}
        action={snackbarAction}
        onClick={onSnackbarAction}
        onTimeout={this.hideSnackbar}
      >
        {snackbar}
      </Mdl.Snackbar>
    );
  }
}
