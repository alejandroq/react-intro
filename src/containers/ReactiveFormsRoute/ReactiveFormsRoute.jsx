import React from 'react';
import { FormBuilder, FieldControl, FieldGroup } from 'react-reactive-form';
import Values from './Values';
import styles from './styles';

// React SFC to render Input element
const TextInput = ({ handler, meta: { label, placeholder } }) => (
  <div>
    <label>{label}:</label>
    <input placeholder={placeholder} style={styles.input} {...handler()} />
  </div>
);

export default class ReactiveFormsRoute extends React.Component {
  // Create a group of form controls with default values.
  myForm = FormBuilder.group({
    first_name: '',
    last_name: '',
    gender: 'male',
    nationality: '',
    terms: false,
    notes: '',
  });
  handleSubmit(e) {
    e.preventDefault();
    alert(`You submitted \n ${JSON.stringify(this.myForm.value, null, 2)}`);
  }
  handleReset() {
    this.myForm.reset();
  }
  render() {
    return (
      <div style={styles.main}>
        <h2>Simple Form</h2>
        <FieldGroup
          control={this.myForm}
          render={({ pristine, value }) => (
            <form onSubmit={() => this.handleSubmit}>
              <FieldControl
                name="first_name"
                render={TextInput}
                // Use meta to add some extra props
                meta={{
                  label: 'First Name',
                  placeholder: 'Enter first name',
                }}
              />

              <FieldControl
                name="last_name"
                meta={{
                  label: 'Last Name',
                  placeholder: 'Enter last name',
                }}
                render={TextInput}
              />

              <FieldControl
                name="gender"
                render={({ handler }) => (
                  <div style={styles.genderContainer}>
                    <div style={styles.genderText}>
                      <label>Gender:</label>
                    </div>
                    <div style={styles.radioContainer}>
                      <div>
                        <input {...handler('radio', 'male')} />
                        <label>Male</label>
                      </div>
                      <div>
                        <input {...handler('radio', 'female')} />
                        <label>Female</label>
                      </div>
                      <div>
                        <input {...handler('radio', 'other')} />
                        <label>Other</label>
                      </div>
                    </div>
                  </div>
                )}
              />

              <FieldControl
                name="nationality"
                render={({ handler }) => (
                  <div>
                    <label>Nationality:</label>
                    <select style={styles.input} {...handler()}>
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="us">US</option>
                      <option value="uk">UK</option>
                      <option value="india">India</option>
                      <option value="china">China</option>
                    </select>
                  </div>
                )}
              />

              <FieldControl
                name="notes"
                render={({ handler }) => (
                  <div style={styles.genderContainer}>
                    <div style={styles.genderText}>
                      <label>Notes:</label>
                    </div>
                    <div style={styles.textAreaContainer}>
                      <textarea style={styles.textAreaStyles} {...handler()} />
                    </div>
                  </div>
                )}
              />

              <FieldControl
                name="terms"
                render={({ handler }) => (
                  <div>
                    <input {...handler('checkbox')} />
                    <label>
                      &nbsp;&nbsp;I agree to the terms and condition.
                    </label>
                  </div>
                )}
              />

              <div>
                <button
                  disabled={pristine}
                  style={styles.button}
                  onClick={e => this.handleSubmit(e)}
                >
                  Submit
                </button>
                <button
                  type="button"
                  style={styles.button}
                  onClick={() => this.handleReset()}
                >
                  Reset
                </button>
              </div>
              <Values value={value} />
            </form>
          )}
        />
      </div>
    );
  }
}
