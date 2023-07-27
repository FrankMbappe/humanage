import { getPersonFullName } from "@/utils";
import { api } from "@/utils/api";
import {
  Avatar,
  Badge,
  Checkbox,
  CheckboxGroup,
  type CheckboxGroupProps,
  Divider,
  Flex,
  Icon,
  IconButton,
  type IconButtonProps,
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
  type WrapProps,
} from "@chakra-ui/react";
import { type Employee } from "@prisma/client";
import { useSession } from "next-auth/react";
import { FiPlus } from "react-icons/fi";

type Props = {
  containerProps?: WrapProps;
  addBtnProps?: IconButtonProps;
  inputProps?: CheckboxGroupProps & {
    value?: string[];
  };
  onCandidateClick?: (candidate: Employee) => void;
  selectedCandidates?: Employee[];
};

const CandidateInput = ({
  containerProps,
  inputProps,
  addBtnProps,
  onCandidateClick,
  selectedCandidates,
}: Props) => {
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

  return (
    <Wrap w="full" spacing={4} {...containerProps}>
      <WrapItem>
        <Stack align="center">
          <>
            <IconButton
              icon={<Icon as={FiPlus} boxSize={8} />}
              onClick={onOpen}
              boxSize={24}
              rounded="full"
              {...addBtnProps}
              aria-label="Add candidate"
            />
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add candidates</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <CheckboxGroup colorScheme="purple" {...inputProps}>
                    <Stack spacing={3} divider={<Divider />}>
                      {employees?.map((employee) => (
                        <Flex direction="row" key={employee.id} align="center">
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

      {inputProps?.value?.map((candidateId) => {
        const candidate = employees?.find(
          (e) => e.id === (candidateId as string)
        );
        return (
          candidate && (
            <WrapItem
              key={candidate.id}
              onClick={() => onCandidateClick?.(candidate)}
              cursor="pointer"
              transition="150ms ease-in-out"
              _hover={{
                transition: "150ms ease-in-out",
                transform: "translateY(-5%)",
              }}
            >
              <Stack align="center">
                <Avatar
                  size="xl"
                  src={candidate.picUrl ?? undefined}
                  name={getPersonFullName(candidate)}
                  {...(selectedCandidates?.some(
                    (c) => c.id === candidate.id
                  ) && {
                    borderWidth: 4,
                    borderColor: "purple.400",
                  })}
                />
                <Flex direction="column">
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                    textAlign="center"
                    w="full"
                  >
                    {candidate.firstName}
                  </Text>
                  <Text fontSize="xs" color="gray" textAlign="center" w="full">
                    {candidate.personality}
                  </Text>
                </Flex>
              </Stack>
            </WrapItem>
          )
        );
      })}
    </Wrap>
  );
};

export default CandidateInput;
