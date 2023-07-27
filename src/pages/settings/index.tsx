import { formatAsPercentage, getSpectrumValue } from "@/utils";
import { PERSONALITY_COMPATIBILITY } from "@/utils/res";
import {
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Head from "next/head";

const compatibilityTable = PERSONALITY_COMPATIBILITY;

const Settings = () => {
  return (
    <>
      <Head>
        <title>HUMG 👻 - Settings</title>
      </Head>

      <Flex direction="column" w="full">
        <Flex direction="column">
          <Heading>Settings</Heading>
          <Text mt={2}>Edit default variables</Text>
        </Flex>

        <TableContainer w="full" maxW="container.lg" mt={4} overflowX="scroll">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                {Object.keys(compatibilityTable).map((personality) => (
                  <Th key={personality}>{personality}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(compatibilityTable).map(
                ([personality, compatibility]) => (
                  <Tr key={personality}>
                    <Th>{personality}</Th>
                    {Object.values(compatibility).map((value, index) => (
                      <Td
                        key={index}
                        bgColor={getSpectrumValue(value * 100)}
                        color="white"
                      >
                        {formatAsPercentage(value)}
                      </Td>
                    ))}
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};
export default Settings;
