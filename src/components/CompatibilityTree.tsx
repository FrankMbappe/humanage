import { type Composition } from "@/models";
import { getSpectrumValue } from "@/utils";
import { Box, Flex, type FlexProps, Text } from "@chakra-ui/react";

type Props = FlexProps & {
  composition: Composition;
};

const Legend = () => {
  return (
    <Flex>
      {[100, 75, 50, 25, 0].map((value, index, array) => (
        <>
          <Text fontSize="0.5rem" transform="translateY(1rem)">
            {value}
          </Text>
          {index + 1 < array.length && (
            <Box
              bgColor={getSpectrumValue(array[index + 1] as number)}
              w="2.1875rem"
              h="0.875rem"
            />
          )}
        </>
      ))}
    </Flex>
  );
};

const CompatibilityTree = ({ ...props }: Props) => {
  return (
    <Flex direction="column" {...props}>
      <Box w="full" h="sm" borderWidth={1}></Box>
      <Legend />
    </Flex>
  );
};

export default CompatibilityTree;
