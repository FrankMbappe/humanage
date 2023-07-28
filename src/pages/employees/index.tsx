import Head from "next/head";
import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { getPersonFullName } from "@/utils";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FiEdit, FiDelete, FiRefreshCcw } from "react-icons/fi";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { type Employee } from "@prisma/client";
import { useRouter } from "next/router";
import { RouteEnum } from "@/utils/enums";
import EmployeeBioBtn from "@/components/EmployeeBioBtn";

const Employees = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const {
    data: employees,
    refetch: refetchEmployees,
    isLoading,
    isError,
  } = api.employee.getAll.useQuery(
    undefined, // No input
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  const toast = useToast();
  const deleteEmployee = api.employee.delete.useMutation({
    onSuccess: (employee) => {
      toast({
        title: `Removed "${employee.firstName}"`,
        description: "An employee was removed from the table.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      void refetchEmployees();
    },
  });
  const onCreateBtnClick = () => {
    void router.push(RouteEnum.EmployeeCreate);
  };
  const onEditBtnClick = (employee: Employee) => {
    void router.push(`${RouteEnum.Employees}/${employee.id}/edit`);
  };
  const onDeleteBtnClick = (employee: Employee) => {
    deleteEmployee.mutate({ id: employee.id });
  };

  return (
    <>
      <Head>
        <title>HUMG 👻 - Employees</title>
      </Head>

      <Flex direction="column" w="full">
        <Flex direction="column">
          <Heading>Employees</Heading>
          <Text mt={2}>
            Create, edit, and delete employees of your organization
          </Text>
        </Flex>

        {isError ? (
          <Text color="red">Something went wrong</Text>
        ) : (
          <Flex direction="column" mt={4} w="full">
            <Flex justify="space-between" align="center" w="full">
              <Text fontWeight="bold">
                {employees ? `${employees.length} record(s)` : "Loading..."}
              </Text>
              <ButtonGroup size="sm" isDisabled={isLoading || isError}>
                <IconButton
                  icon={<Icon as={FiRefreshCcw} />}
                  aria-label="Refresh table"
                  variant="outline"
                  isLoading={isLoading}
                  onClick={() => void refetchEmployees()}
                />
                <Button colorScheme="purple" onClick={onCreateBtnClick}>
                  New
                </Button>
              </ButtonGroup>
            </Flex>

            <TableContainer w="full" mt={4} overflowX="scroll">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Job position</Th>
                    <Th>Personality</Th>
                    <Th>Created</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employees?.map((employee) => (
                    <Tr key={employee.id}>
                      <Td>
                        <Flex align="center">
                          <Avatar
                            src={employee.picUrl ?? undefined}
                            name={getPersonFullName(employee)}
                          />
                          <Text ms={4}>{getPersonFullName(employee)}</Text>
                          <EmployeeBioBtn employee={employee} ms={2} />
                        </Flex>
                      </Td>
                      <Td>{employee.jobPosition}</Td>
                      <Td>{employee.personality}</Td>
                      <Td>
                        {formatDistanceToNow(employee.createdAt, {
                          addSuffix: true,
                        })}
                      </Td>
                      <Td>
                        <ButtonGroup variant="outline" isAttached>
                          <IconButton
                            icon={<Icon as={FiEdit} />}
                            aria-label="Edit"
                            onClick={() => onEditBtnClick(employee)}
                          />
                          <IconButton
                            icon={<Icon as={FiDelete} />}
                            aria-label="Delete"
                            isLoading={
                              deleteEmployee.isLoading &&
                              deleteEmployee.variables?.id === employee.id
                            }
                            onClick={() => onDeleteBtnClick(employee)}
                          />
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Employees;
