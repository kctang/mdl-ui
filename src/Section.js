import React from 'react';

class SectionItem extends React.Component {
  getChildContext() {
    const { index, removed, toggleSection, addSection } = this.props;
    return { index, removed, toggleSection, addSection };
  }

  render() {
    const { index, removed, toggleSection, addSection } = this.props;
    const style = {
      header: {
        display: 'flex',
      },
      icon: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      overlayWrapper: {
        position: 'relative',
        zIndex: 0,
      },
      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0, 0.12)',
        backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAANUlEQVQYV2NkIAIwEqGGAVmRMQMDw1kkTXA+ukkwCRQN2KxDNxHFOpBNBE0i2k1YPUtUEAAAuEUJCv1Qk8kAAAAASUVORK5CYII=')",
        backgroundRepeat: 'repeat',
      },
    };

    return (
      <div className="mdl-cell mdl-grid mdl-grid--no-spacing">
        {removed ? (
          <div className="mdl-cell--12-col" style={style.header}>
            <div className="mdl-layout-spacer"></div>
            <button className="mdl-button mdl-js-button mdl-button--icon" onClick={toggleSection}>
              <i className="material-icons" style={style.icon}>undo</i>
            </button>
          </div>
        ) : (
          <div className="mdl-cell--12-col" style={style.header}>
            <div className="mdl-layout-spacer"></div>
            <button className="mdl-button mdl-js-button mdl-button--icon" onClick={toggleSection}>
              <i className="material-icons" style={style.icon}>remove</i>
            </button>
          </div>
        )}
        <div className="mdl-cell--12-col" style={style.overlayWrapper}>
          {this.props.children}
          {removed && <div style={style.overlay} />}
        </div>
      </div>
    );
  }
}
SectionItem.childContextTypes = {
  index: React.PropTypes.number,
  removed: React.PropTypes.bool,
  addSection: React.PropTypes.func,
  toggleSection: React.PropTypes.func,
};

export default class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [
        { index: 0, removed: false },
        { index: 1, removed: true },
        { index: 2, removed: false },
      ],
    };
  }

  toggleSection(section) {
    const sections = this.state.sections;
    sections[section.index] = { ...section, removed: !section.removed };
    this.setState({ sections });
  }

  addSection() {
    const { sections } = this.state;
    sections.push({ index: sections.length, removed: false });
    this.setState({ sections });
  }

  render() {
    const { title = 'Untitled Section' } = this.props;
    const { sections } = this.state;
    const style = {
      header: {
        display: 'flex',
        borderBottom: '1px solid rgba(0,0,0, 0.12)',
      },
      title: {
        alignSelf: 'center',
        color: 'rgb(63,81,181)',
        fontSize: 12,
        fontWeight: 'bold',
      },
      icon: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    };

    const children = sections.map(section => (
      <SectionItem {...section}
        key={section.index}
        toggleSection={this.toggleSection.bind(this, section)}
        addSection={this.addSection.bind(this, section)}>
        {this.props.children}
      </SectionItem>
    ));

    return (
      <div className="mdl-grid">
        <div className="mdl-cell--12-col mdl-grid mdl-grid--no-spacing" style={style.header}>
          <div style={style.title}>{title}</div>
          <div className="mdl-layout-spacer"></div>
          <button className="mdl-button mdl-js-button mdl-button--icon" onClick={this.addSection.bind(this)}>
            <i className="material-icons" style={style.icon}>add</i>
          </button>
        </div>
        {children}
      </div>
    );
  }
}
