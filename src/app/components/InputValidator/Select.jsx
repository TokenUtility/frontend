import React from "react";
import { ValidatorComponent } from "react-form-validator-core";
import { Select, FormControl, InputLabel, FormHelperText } from "@mui/material";

class SelectValidator extends ValidatorComponent {
  renderValidatorComponent() {
    const {
      error,
      errorMessages,
      validators,
      requiredError,
      helperText,
      validatorListener,
      withRequiredValidator,
      containerProps,
      children,
      label,
      InputLabelProps,
      FormControlProps,
      FormHelperTextProps,
      id,
      ...rest
    } = this.props;
    const { isValid } = this.state;
    return (
      <FormControl
        {...FormControlProps}
        variant="filled"
        fullWidth={true}
        error={!isValid || error}
      >
        {label && (
          <InputLabel {...InputLabelProps} htmlFor={id} shrink={true}>
            {label}
          </InputLabel>
        )}
        <Select {...rest}>{children}</Select>
        {!isValid && (
          <FormHelperText sx={{ mt: 2 }} {...FormHelperTextProps}>
            {this.getErrorMessage()}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

export default SelectValidator;
