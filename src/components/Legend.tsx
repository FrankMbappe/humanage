import { getSpectrumValue } from "@/utils";
import { Box, Flex, Text } from "@chakra-ui/react";

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

export default Legend;
