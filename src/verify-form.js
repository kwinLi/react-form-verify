import React from 'react';
import PropTypes from 'prop-types';

export class VerifyForm extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      isDirty: false,
      allValidateResults: {}
    };

    this.collectValidateResults = this.collectValidateResults.bind(this);
  }

  collectValidateResults(fieldValidateResults) {
    this.setState((prevState) => {
      const allValidateResults = {
        ...prevState.allValidateResults,
        ...fieldValidateResults
      };
      const allResults = Object.values(allValidateResults);
      const isDirty = prevState.isDirty || fieldValidateResults.isDirty || allResults.some(({ isDirty }) => isDirty);
      const isInvalid = fieldValidateResults.isInvalid || allResults.some(({ isInvalid }) => isInvalid);
      const isValid = !isInvalid;

      return {
        isDirty,
        isValid,
        isInvalid,
        allValidateResults
      };
    });
  }

  render() {
    const { isDirty, isValid, isInvalid, allValidateResults } = this.state;

    return this.props.children({
      isDirty,
      isValid,
      isInvalid,
      form: allValidateResults,
      collect: this.collectValidateResults
    });
  }
}
