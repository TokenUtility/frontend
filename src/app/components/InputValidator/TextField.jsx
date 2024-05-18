// @ts-nocheck
import React from "react";
import { ValidatorComponent } from "react-form-validator-core";
import {
  Typography,
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";

const styleHelpText = {
  color: "#00",
  mt: 1,
  fontSize: "12px",
  lineHeight: 1.2,
};

class TextValidator extends ValidatorComponent {
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
      hintTop,
      hintBottom,
      label,
      FormHelperTextProps,
      InputLabelProps,
      FormControlProps,
      isPrefix,
      id,
      styleInput,
      ...rest
    } = this.props;
    const { isValid } = this.state;

    return (
      <FormControl
        {...FormControlProps}
        fullWidth={true}
        error={!isValid || error}
      >
        {label && (
          <InputLabel {...InputLabelProps} htmlFor={id} shrink={true}>
            {label}
          </InputLabel>
        )}

        {hintTop && <Typography sx={styleHelpText}>{hintTop}</Typography>}

        <FilledInput
          id={id}
          sx={{ mt: 2, ...styleInput }}
          {...rest}
          autoFocus={true}
          inputProps={{
            style: {
              paddingLeft: isPrefix && "0",
            },
          }}
        />
        {!isValid && (
          <FormHelperText sx={{ mt: 2 }} {...FormHelperTextProps}>
            {this.getErrorMessage()}
          </FormHelperText>
        )}
        {hintBottom && <Typography sx={styleHelpText}>{hintBottom}</Typography>}
      </FormControl>
    );
  }
}

export default TextValidator;
