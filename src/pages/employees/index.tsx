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
} from "@chakra-ui/react";
import { getPersonFullName } from "@/utils";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FiEdit, FiDelete, FiRefreshCcw } from "react-icons/fi";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

const Employees = () => {
  const { data: sessionData } = useSession();
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

  return (
    <>
      <Head>
        <title>HUMG 👻 - Employees</title>
      </Head>

      <Flex direction="column" flex={1}>
        <Flex direction="column">
          <Heading>Employees</Heading>
          <Text mt={2}>
            Create, edit, and delete employees of your organization
          </Text>
        </Flex>

        {isError ? (
          <Text color="red">Something went wrong</Text>
        ) : (
          <Flex direction="column" mt={4}>
            <Flex justify="space-between" align="center" flex={1}>
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
                <Button colorScheme="purple">New</Button>
              </ButtonGroup>
            </Flex>

            <TableContainer mt={4}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Job position</Th>
                    <Th>Created</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employees?.map((emp) => (
                    <Tr key={emp.id}>
                      <Td>
                        <Flex align="center">
                          <Avatar
                            src={emp.picUrl ?? undefined}
                            name={getPersonFullName(emp)}
                          />
                          <Text ms={4}>{getPersonFullName(emp)}</Text>
                        </Flex>
                      </Td>
                      <Td>{emp.jobPosition}</Td>
                      <Td>
                        {formatDistanceToNow(emp.createdAt, {
                          addSuffix: true,
                        })}
                      </Td>
                      <Td>
                        <ButtonGroup variant="outline" isAttached>
                          <IconButton
                            icon={<Icon as={FiEdit} />}
                            aria-label="Edit"
                          />
                          <IconButton
                            icon={<Icon as={FiDelete} />}
                            aria-label="Delete"
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
