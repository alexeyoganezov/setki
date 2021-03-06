import React from 'react';
import Formsy from 'formsy-react';

function contains(container, item, cmp) {
  for (const it of container) {
    if (cmp(it, item)) {
      return true;
    }
  }
  return false;
}

const MyRadioGroup = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState() {
    return { value: [], cmp: (a, b) => a === b };
  },
  componentDidMount() {
    const value = this.props.value || [];
    this.setValue(value);
    this.setState({ value: value, cmp: this.props.cmp || this.state.cmp });
  },

  changeValue(value, event) {
    const checked = event.currentTarget.checked;

    let newValue = [];
    if (checked) {
      newValue = this.state.value.concat(value);
    } else {
      newValue = this.state.value.filter(it => !this.state.cmp(it, value));
    }

    this.setValue(newValue);
    this.setState({ value: newValue });
  },

  render() {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    const { name, title, items } = this.props;
    return (
      <span className={className}>
        {items.map((item, i) => (
          <span key={i} className="checkbox-item">
            <input
              className="checkbox-item__input"
              type="checkbox"
              name={name}
              onChange={this.changeValue.bind(this, item)}
              checked={contains(this.state.value, item, this.state.cmp)}
            />
            <span className="checkbox-item__icon"></span>
          </span>
        ))
        }
      </span>
    );
  }

});

export default MyRadioGroup;
