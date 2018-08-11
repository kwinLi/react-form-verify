## Usage

```jsx
<VerifyField
  value={this.state.username}
  onChange={this.handleChange}
  name='username'
  required
>
  {({ isDirty, isRequired, tail }) => (
    <div>
      <input type='text' { ...tail } />
      {isDirty && !isRequired && <span>Please enter a username</span>}
    </div>
  )}
</VerifyField>

// Or

<VerifyForm>
{({ isDirty, isInvalid, form, collect }) => (
  <div>
    <VerifyField
      value={this.state.username}
      onChange={this.handleChange}
      delegate={collect}
      name='username'
      required
    >
      {({ tail }) => (
        <div>
          <input type='text' { ...tail } />
          {isDirty && isInvalid && !form.username.isRequired && <span>Please enter a username</span>}
        </div>
      )}
    </VerifyField>
    <VerifyField
      value={this.state.password}
      onChange={this.handleChange}
      delegate={collect}
      name='password'
      required
    >
      {({ tail }) => (
        <div>
          <input type='text' { ...tail } />
          {isDirty && isInvalid && !form.password.isRequired && <span>Please enter a password</span>}
        </div>
      )}
    </VerifyField>
  </div>
)}
<VerifyForm>
```

## VerifyField

This component can helps you detect user's enter in a `input` element.

#### Props

`VerifyField` component receive a [render props](https://reactjs.org/docs/render-props.html) function as a its children.

`VerifyField` currently support the props below:

- value: The input field value
- required: This property specifies that the user must fill in a value
- number: This property specifies that the user fill in a number
- email: This property specifies that the user fill in a email address
- url: This property specifies that the user fill in a URL
- minLength: This property specifies the minimum number of characters (in UTF-16 code units) that the user can enter
- maxLength: This property specifies the maximum number of characters (in UTF-16 code units) that the user can enter
- pattern: You can provide a custom a regular expression that the control's value is checked against
- validator: You can provide a custom validate function that the control's value is checked against
- focus: Check if the user is focused or blured on the input
- blur: Check if the user is focused or blured on the input
- debounce: Detecting the frequency of input changes. The default is 200 milliseconds
- delegate: This property specifies a function that `VerifyForm` have provided. When you use this property, the validation result of the `VerifyField` will be provided by `VerifyForm`.

#### Validate Results

The [render props](https://reactjs.org/docs/render-props.html) function will receive an object that is validated by the above props you provided. You can view this validation results as follows.

```jsx
 <VerifyField>
  {(validateResults) => (
    <div>
      <div><input /></div>
      <pre>
        {JSON.stringify(validateResults, null, 2)}
      </pre>
    </div>
  )}
 </VerifyField>

// Based on the property you provide to the VerifyField
// validateResults may have the following structure
{
  isValid,
  isInvalid,
  isDirty,
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
  tail
}
```

#### Notes

1. tail

You can pass anything to the `VerifyField` component. But the `VerifyField` component will only receive the props above, and assigns the remaining props and `value` prop to the `tail`. You can allocate it to `input` element like <input {...tail} /> to avoid writing some props repeatedly.

```jsx
// value prop are repeated in <VerifyField /> and <input />
<VerifyField value={this.username} required >
  {({ isRequired }) => (
    <input type='text' name='username' value={this.username} onChange={this.handleChange} />
  )}
</VerifyField>

// The <input /> will be rendered like <input type='text' name='username' value={this.username} onChange={this.handleChange} />
<VerifyField
  type='text'
  name='username'
  value={this.username}
  onChange={this.handleChange}
  required
>
  {({ isRequired, tail }) => (
    <input { ...tail } />
  )}
</VerifyField>

// By the way, I think it is more semantic to write type on input element like <input type='text' {...tail} />
```

2. focus, blur

The effects of `focus` prop and `blur` prop are the same, just use one of them.

If you use `focus` or `blur` and want to handle focus or blur events in the `input` element, you have to pass handler to the `VerifyField`, otherwise the handler may fail.

```jsx
// Do not do this
<VerifyField value={this.state.username} onChange={this.handleChange} focus>
  {() => <input type='text' onFocus={this.focusHandler} onBlur={this.blurHandler} />}
</VerifyField>

// You should do so
<VerifyField
  value={this.state.username}
  onChange={this.handleChange}
  onFocus={this.focusHandler}
  onBlur={this.blurHandler}
  focus
>
  {({ tail }) => <input type='text' {...tail} />}
</VerifyField>
```

## VerifyForm

This component needs to work with `VerifyField`. It can helps you detect user's enter in all `input` elements.

#### Props and validation results

`VerifyForm` component only receive a [render props](https://reactjs.org/docs/render-props.html) function as a its children.

The validation results of all `VerifyField` will be collected by `VerifyForm`.

```jsx
<VerifyForm>
  {({ isDirty, isValid, isInvalid, form, collect }) => (
    <div>
      {/* The form parameter contains all validation results */}
      <VerifyField name='username' delegate={collect} required focus >
        {({ isFocus, isBlur, tail }) => (
          <div>
            <input type='text' {...tail}/>
            {isInvalid && !form.username.isRequired && <span>Please enter a username</span>}
          </div>
        )}
      </VerifyField>
    </div>
  )}
</VerifyForm>
```

#### Notes

1. collect

You have to pass `collect` to the `delegate` of the `VerifyField`. Because the `VerifyForm` does not have a validation function, it can only collect the validation results of the `VerifyField`.

2. isInvalid

You need to use `isInvalid` before using the `form` parameter. Because the `form` parameter is empty when the `VerifyForm` is rendered for the first time.
