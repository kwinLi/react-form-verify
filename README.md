## Usage

```js
import React, { Component } from 'react';
import { VerifyField } from 'react-form-verify';

class APP extends Component{
  state = {
    username: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  render() {
    return (
      <VerifyField
        value={this.username}
        onChange={this.handleChange}
        required
      >
        {({ isRequired, tail }) => (
          <div>
            <input type='text' name='username' { ...tail } />
            {isRequired && <span>Please enter a username</span>}
          </div>
        )}
      </VerifyField>
    )
  }
};

React.render(<App />, document.querySelector('#root'));
```

## VerifyField

`VerifyField` receive a render callback function as a its children.

`VerifyField` currently support the props below:

- value: PropTypes.string.isRequired, The input field value
- required: PropTypes.bool 
- number: PropTypes.bool 
- email: PropTypes.bool 
- url: PropTypes.bool 
- minLength: PropTypes.number 
- maxLength: PropTypes.number 
- pattern: PropTypes.string, You can provide a custom regular expression
- validator: PropTypes.func, You can provide a custom validator function
- focus: PropTypes.bool 
- blur: PropTypes.bool 
- debounce: PropTypes.number 

## Render Props

The render callback function will receive an object that is validated by the above props you provided. It may have the following structure:

```
{
  isRequired,
  isNumber,
  isEmail,
  isUrl,
  isValidMinLength,
  isValidMaxLength,
  isValidByPattern,
  isValidByValidator,
  isFocus,
  isBlur,
  isValid,
  isInvalid,
  tail // All props except the VerifyField received
}
```
