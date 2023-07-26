import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  forwardRef,
  type InputProps,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

type Props = InputProps & {
  name: string;
  label?: string;
  helperText?: string;
  error?: string;
};

const FormInput = forwardRef<Props, "input">(
  ({ label, size, helperText, error, ...props }: Props, ref) => {
    return (
      <FormControl ref={ref} isInvalid={!!error}>
        {label && <FormLabel>{label}</FormLabel>}
        {props.type === "number" ? (
          <NumberInput>
            <NumberInputField {...props} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        ) : (
          <Input size={size} {...props} />
        )}
        {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
        {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  }
);
export default FormInput;
