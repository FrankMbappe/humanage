import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
  forwardRef,
  type SelectProps,
} from "@chakra-ui/react";

type Props = SelectProps & {
  label?: string;
  helperText?: string;
  error?: string;
};

const FormInput = forwardRef<Props, "select">(
  ({ label, helperText, error, ...props }: Props, ref) => {
    return (
      <FormControl ref={ref} isInvalid={!!error}>
        {label && <FormLabel>{label}</FormLabel>}
        <Select {...props} />
        {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
        {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  }
);
export default FormInput;
