import React from "react";
import PropTypes from 'prop-types';

export class VerifyForm extends React.Component {
  static propTypes = {
    children: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      isDirty: false
    }

    this.syncSummary = this.syncSummary.bind(this);
  }

  syncSummary(validateResults) {
    this.setState((prevState) => {
      const { form } = prevState;
      const allValidateResults = Object.values(form);
      const isInvalid = allValidateResults.some(({ isInvalid }) => isInvalid);
      const isValid = !isInvalid;
      let { isDirty } = prevState;

      if (!isDirty) {
        isDirty = allValidateResults.some(({ isDirty }) => isDirty);
      }

      return {
        isDirty,
        isValid,
        isInvalid,
        form: {
          ...form,
          ...validateResults
        }
      }
    });
  }

  render() {
    const { state, syncSummary } = this;

    return this.props.children({ ...state, sync: syncSummary });
  }
}
