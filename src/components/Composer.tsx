import { type Composition } from "@/models";
import { formatAsPercentage, getPersonFullName } from "@/utils";
import { Text, Stack, Avatar, type StackProps } from "@chakra-ui/react";

type Props = StackProps & {
  compositions: Composition[];
  value?: Composition;
  onChange?: (composition: Composition) => void;
};

const Composer = ({ compositions, value, onChange, ...props }: Props) => {
  return (
    <Stack maxH={60} overflowY="scroll" p={2} ps={0} {...props}>
      {compositions.map((composition, index) => {
        const isActive =
          !!value &&
          value.members.every((m1) =>
            composition.members.some((m2) => m1.id === m2.id)
          );
        return (
          <Stack
            key={index}
            onClick={() => onChange?.(composition)}
            direction="row"
            borderWidth={1}
            align="center"
            px={4}
            py={2}
            spacing={3}
            rounded="lg"
            cursor="pointer"
            bgColor={isActive ? "purple.100" : "white"}
            transition="150ms ease-in-out"
            _hover={{
              bgColor: isActive ? "purple.200" : "gray.100",
              transition: "150ms ease-in-out",
            }}
          >
            <Text
              fontSize="lg"
              fontWeight={isActive ? "bold" : undefined}
              color={isActive ? "purple" : undefined}
            >
              {formatAsPercentage(composition.compatibilityAvg)}
            </Text>
            {composition.members.map((member) => (
              <Avatar
                key={member.id}
                src={member.picUrl ?? undefined}
                name={getPersonFullName(member)}
              />
            ))}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Composer;
