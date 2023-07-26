import { Personality } from "@prisma/client";
import { useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";

const validationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  jobPosition: z.string().min(1, { message: "Job position is required" }),
  picUrl: z.string().optional(),
  bio: z.string().optional(),
  personality: z.nativeEnum(Personality),
});
type FormData = z.infer<typeof validationSchema>;

type ModalProps = {
  employee?: FormData;
  onClose: () => void;
  onCreate: (data: FormData) => void;
  isOpen: boolean;
  isLoading?: boolean;
};

const EmployeeFormModal = ({
  employee,
  onClose,
  isOpen,
  onCreate,
  isLoading,
}: ModalProps) => {
  const isEditing = useMemo(() => !!employee, [employee]);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<FormData>({});
  const onFormClose = () => {
    onClose();
    reset();
  };
  const onSubmit = handleSubmit((data) => {
    const isEditing = !!employee;
    console.log("Data", data);
    // If we're editing, we need to update the value
    if (isEditing) {
      // Update
    } else {
      // Create
      onCreate({
        ...data,
        bio: data.bio ?? undefined, // Optional
        picUrl: data.picUrl ?? undefined, // Optional
      });
    }
    onFormClose();
  });

  return (
    <Modal
      isOpen={isOpen}
      motionPreset="slideInBottom"
      onClose={onFormClose}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={(e) => void onSubmit(e)}>
          <ModalHeader>
            {isEditing ? "Edit employee" : "Add employee"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={5}>
              <FormInput
                label="Picture URL"
                placeholder="https://image.com/example.png"
                {...register("picUrl")}
              />
              <FormInput
                label="First name"
                placeholder="e.g. Jane"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <FormInput
                label="Last name"
                placeholder="e.g. Doe"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
              <FormInput
                label="Job position"
                placeholder="e.g. Sales Manager"
                error={errors.jobPosition?.message}
                {...register("jobPosition")}
              />
              <FormInput
                label="Bio"
                placeholder="Biography"
                error={errors.bio?.message}
                {...register("bio")}
              />
              <FormSelect
                label="Personality"
                placeholder="Select a personality..."
                error={errors.personality?.message}
                {...register("personality")}
              >
                {Object.values(Personality).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </FormSelect>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button onClick={onFormClose} variant="ghost">
                Cancel
              </Button>
              <Button
                colorScheme="purple"
                isLoading={isSubmitting || isLoading}
                type="submit"
              >
                Save
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EmployeeFormModal;
