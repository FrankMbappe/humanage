import { getPersonFullName } from "@/utils";
import { personalityDescription } from "@/utils/res";
import {
  type ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Avatar,
  Flex,
  Text,
  Stack,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { type Employee } from "@prisma/client";
import { FiEye } from "react-icons/fi";

type Props = ButtonProps & {
  employee: Employee;
};

const EmployeeBioBtn = ({ employee, ...props }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        size="sm"
        colorScheme="gray"
        icon={<Icon as={FiEye} />}
        {...props}
        onClick={onOpen}
        aria-label="View employee"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About {employee.firstName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={8}>
              <Flex direction="column" align="center" textAlign="center">
                <Avatar
                  size="2xl"
                  src={employee.picUrl ?? undefined}
                  name={getPersonFullName(employee)}
                />
                <Text fontSize="3xl" fontWeight="600" mt={2}>
                  {getPersonFullName(employee)}
                </Text>
                <Text color="gray.500">{employee.jobPosition}</Text>
              </Flex>
              {!!employee.bio && (
                <Stack>
                  <Text fontSize="0.75rem" fontWeight="700">
                    ABOUT
                  </Text>
                  <Text textAlign="justify">{employee.bio}</Text>
                </Stack>
              )}
              <Stack>
                <Text fontSize="0.75rem" fontWeight="700">
                  PERSONALITY
                </Text>
                <Text fontSize="2.75rem" fontWeight="700">
                  {employee.personality}
                </Text>
                <Text textAlign="justify">
                  {personalityDescription[employee.personality].description}
                </Text>
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmployeeBioBtn;
