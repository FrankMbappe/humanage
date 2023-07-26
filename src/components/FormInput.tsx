import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  forwardRef,
  type InputProps,
} from "@chakra-ui/react";

type Props = InputProps & {
  name: string;
  label?: string;
  helperText?: string;
  error?: string;
};

const FormInput = forwardRef<Props, "input">(
  ({ label, helperText, error, ...props }: Props, ref) => {
    return (
      <FormControl ref={ref} isInvalid={!!error}>
        {label && <FormLabel>{label}</FormLabel>}
        <Input {...props} />
        {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
        {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  }
);
export default FormInput;
