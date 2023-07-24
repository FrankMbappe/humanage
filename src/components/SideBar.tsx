import { Flex, Icon, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { type IconType } from "react-icons";
import { PiBagBold, PiUsersFourBold } from "react-icons/pi";
import { BiCog, BiLogOut } from "react-icons/bi";

type ListItem = {
  icon: IconType;
  name: string;
};

const Item = ({ item }: { item: ListItem }) => {
  return (
    <Flex
      px={4}
      py={3}
      align="center"
      borderRadius={8}
      cursor="pointer"
      _hover={{
        bgColor: "gray.100",
        transition: "150ms ease-in-out",
      }}
      _pressed={{
        bgColor: "gray.300",
      }}
    >
      <Icon as={item.icon} color="gray.500" boxSize={6} />
      <Text ms={4} letterSpacing={1}>
        {item.name}
      </Text>
    </Flex>
  );
};

const SideBar = () => {
  const items = useMemo<ListItem[]>(
    () => [
      { name: "Employees", icon: PiUsersFourBold },
      { name: "Projects", icon: PiBagBold },
      { name: "Settings", icon: BiCog },
    ],
    []
  );

  return (
    <Flex direction="column" bg="white" w={60} p={3} borderRightWidth={2}>
      <Image
        src="https://images.vexels.com/media/users/3/136638/isolated/preview/8794edc043ac61418c90043b1ed63f2b-purple-flower-icon.png"
        alt="Logo"
        boxSize={32}
        p={4}
      />

      <Stack mt={6} spacing={1}>
        {items.map((item) => (
          <Item key={item.name} item={item} />
        ))}
      </Stack>

      <Spacer />

      <Item
        item={{
          name: "Log Out",
          icon: BiLogOut,
        }}
      />
    </Flex>
  );
};

export default SideBar;
