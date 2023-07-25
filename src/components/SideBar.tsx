import { Flex, Icon, Spacer, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { type IconType } from "react-icons";
import { PiBagBold, PiUsersFourBold } from "react-icons/pi";
import { BiCog, BiLogOut } from "react-icons/bi";
import { useRouter } from "next/router";
import { RouteEnum } from "../utils/enums";
import Logo from "./Logo";

type ListItem = {
  icon: IconType;
  name: string;
  to?: RouteEnum;
  onClick?: () => void;
};

const Item = ({ item: { icon, name, to, onClick } }: { item: ListItem }) => {
  const router = useRouter();
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
      onClick={to ? () => void router.push(to) : onClick}
    >
      <Icon as={icon} color="gray.500" boxSize={6} />
      <Text ms={4} letterSpacing={1}>
        {name}
      </Text>
    </Flex>
  );
};

const SideBar = () => {
  const items = useMemo<ListItem[]>(
    () => [
      { name: "Employees", icon: PiUsersFourBold, to: RouteEnum.Employees },
      { name: "Projects", icon: PiBagBold, to: RouteEnum.Projects },
      { name: "Settings", icon: BiCog, to: RouteEnum.Settings },
    ],
    []
  );

  return (
    <Flex direction="column" bg="white" w={60} p={3} borderRightWidth={2}>
      <Logo isSelectable />

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
          onClick: () => console.log("Log out"),
        }}
      />
    </Flex>
  );
};

export default SideBar;
