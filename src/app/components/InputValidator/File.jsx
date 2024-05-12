import React from "react";
import { ValidatorComponent } from "react-form-validator-core";
import { FormControl, Box, FormHelperText, InputLabel } from "@mui/material";

const styleImage = {
  borderRadius: "8px",
};

const styleIconClose = {
  position: "absolute",
  right: "1rem",
  top: "1rem",
  border: "1px solid rgba(81, 78, 78, 0.5)",
  borderRadius: "6px",
  zIndex: 1,
  background: "rgba(50, 50, 50, 0.5)",
};

class FileValidator extends ValidatorComponent {
  renderValidatorComponent() {
    const {
      error,
      errorMessages,
      validators,
      requiredError,
      validatorListener,
      withRequiredValidator,
      containerProps,
      id,
      label,
      InputLabelProps,
      imageSrc,
      resetImage,
      loading,
      inputNode,
      imageNode,
      ...rest
    } = this.props;
    const { isValid } = this.state;

    return (
      <FormControl fullWidth={true} error={!isValid || error}>
        {label && (
          <InputLabel {...InputLabelProps} htmlFor={id} shrink={true}>
            {label}
          </InputLabel>
        )}
        {imageSrc ? (
          imageNode({ resetImage, styleIconClose, imageSrc })
        ) : (
          <>
            <Box
              sx={{ ...styleImage, border: !isValid && "1px solid #e84849" }}
            >
              {inputNode({ id, loading, ...rest })}
            </Box>
            {!isValid && (
              <FormHelperText sx={{ mt: 2 }}>
                {this.getErrorMessage()}
              </FormHelperText>
            )}
          </>
        )}
      </FormControl>
    );
  }
}

export default FileValidator;
