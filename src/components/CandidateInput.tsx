import { getPersonFullName } from "@/utils";
import { api } from "@/utils/api";
import { type projectSchema } from "@/utils/schema";
import {
  Avatar,
  Badge,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  FormLabel,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { type UseControllerProps, useController } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { type z } from "zod";

type FormValues = z.infer<typeof projectSchema>;

type Props = UseControllerProps<FormValues> & {
  label?: string;
  error?: string;
};

const CandidateInput = ({ label, error, ...props }: Props) => {
  // Employees
  const { data: sessionData } = useSession();
  const { data: employees } = api.employee.getAll.useQuery(
    undefined, // No input
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  // Field state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { field } = useController<FormValues, "candidateIds">(
    props as UseControllerProps<FormValues, "candidateIds">
  );

  return (
    <Stack w="full">
      {label && <FormLabel>{label}</FormLabel>}

      <Wrap w="full" spacing={4}>
        <WrapItem>
          <Stack align="center">
            <>
              <IconButton
                colorScheme={error ? "red" : "purple"}
                variant={error ? "outline" : "ghost"}
                icon={<Icon as={FiPlus} boxSize={8} />}
                aria-label="Add candidate"
                onClick={onOpen}
                boxSize={24}
                rounded="full"
              />
              <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add candidates</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <CheckboxGroup colorScheme="green" {...field}>
                      <Stack spacing={3} divider={<Divider />}>
                        {employees?.map((employee) => (
                          <Flex
                            direction="row"
                            key={employee.id}
                            align="center"
                          >
                            <Checkbox
                              colorScheme="purple"
                              size="lg"
                              value={employee.id}
                              me={4}
                            />
                            <Avatar
                              src={employee.picUrl ?? undefined}
                              name={getPersonFullName(employee)}
                              me={4}
                            />
                            <Text me={2}>{getPersonFullName(employee)}</Text>
                            <Badge>{employee.personality}</Badge>
                          </Flex>
                        ))}
                      </Stack>
                    </CheckboxGroup>
                  </ModalBody>

                  <ModalFooter />
                </ModalContent>
              </Modal>
            </>
            <Text fontSize="sm">Add</Text>
          </Stack>
        </WrapItem>

        {field.value?.map((candidateId) => {
          const employee = employees?.find((e) => e.id === candidateId);
          return (
            employee && (
              <WrapItem key={employee.id}>
                <Stack align="center">
                  <Avatar
                    size="xl"
                    src={employee.picUrl ?? undefined}
                    name={getPersonFullName(employee)}
                  />
                  <Flex direction="column">
                    <Text
                      fontWeight="bold"
                      fontSize="sm"
                      textAlign="center"
                      w="full"
                    >
                      {employee.firstName}
                    </Text>
                    <Text
                      fontSize="xs"
                      color="gray"
                      textAlign="center"
                      w="full"
                    >
                      {employee.personality}
                    </Text>
                  </Flex>
                </Stack>
              </WrapItem>
            )
          );
        })}
      </Wrap>

      {!!error && (
        <Text fontSize="sm" color="tomato">
          {error}
        </Text>
      )}
    </Stack>
  );
};

export default CandidateInput;
