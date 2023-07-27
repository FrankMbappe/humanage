import { type projectSchema } from "@/utils/schema";
import { FormLabel, Stack, Text } from "@chakra-ui/react";
import { type UseControllerProps, useController } from "react-hook-form";
import { type z } from "zod";
import CandidateInput from "./CandidateInput";

type FormValues = z.infer<typeof projectSchema>;

type Props = UseControllerProps<FormValues> & {
  label?: string;
  error?: string;
};

const FormCandidateInput = ({ label, error, ...props }: Props) => {
  const { field } = useController<FormValues, "candidateIds">(
    props as UseControllerProps<FormValues, "candidateIds">
  );

  return (
    <Stack w="full">
      {label && <FormLabel>{label}</FormLabel>}

      <CandidateInput
        inputProps={field}
        addBtnProps={{
          colorScheme: error ? "red" : "purple",
          variant: error ? "outline" : "ghost",
          "aria-label": "Add",
        }}
      />

      {!!error && (
        <Text fontSize="sm" color="tomato">
          {error}
        </Text>
      )}
    </Stack>
  );
};

export default FormCandidateInput;
