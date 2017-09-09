import React from 'react';
import { SchemaModel, NumberType } from 'rsuite-schema';
import { Button, FormGroup, ControlLabel, HelpBlock } from 'rsuite';
import Selectpicker from 'rsuite-selectpicker';

import { Form, Field } from '../../src';

const model = SchemaModel({
  skill: NumberType().isRequired('该字段不能为空')
});

const CustomField = ({ name, label, accepter, error, ...props }) => (
  <FormGroup className={error ? 'has-error' : ''}>
    <ControlLabel>{label} </ControlLabel>
    <Field name={name} accepter={accepter} {...props} />
    <HelpBlock className={error ? 'error' : ''}>{error}</HelpBlock>
  </FormGroup>
);

class CustomFieldForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        skill: 3,
      },
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { values } = this.state;
    if (!this.form.check()) {
      console.error('数据格式有错误');
      return;
    }
    console.log(values, '提交数据');
  }
  render() {
    const { errors, values } = this.state;
    return (
      <div>
        <Form
          ref={ref => this.form = ref}
          onChange={(values) => {
            this.setState({ values });
            console.log(values);
          }}
          onCheck={errors => this.setState({ errors })}
          defaultValues={values}
          model={model}
        >


          <CustomField
            name="skill"
            label="技能"
            accepter={Selectpicker}
            error={errors.skill}
            data={[
              { label: 'Node.js', value: 1 },
              { label: 'CSS3', value: 2 },
              { label: 'Javascript', value: 3 },
              { label: 'HTML5', value: 4 }
            ]}
          />
          <Button shape="primary" onClick={this.handleSubmit}> 提交 </Button>
        </Form>
      </div>
    );
  }
}

export default CustomFieldForm;
