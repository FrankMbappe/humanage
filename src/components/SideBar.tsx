import { Flex, Icon, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { type IconType } from "react-icons";
import { PiBagBold, PiUsersFourBold } from "react-icons/pi";
import { BiCog, BiLogOut } from "react-icons/bi";
import { useRouter } from "next/router";
import { RoutesEnum } from "./utils/enums";

type ListItem = {
  icon: IconType;
  name: string;
  to?: RoutesEnum;
  onClick?: () => void;
};

const selectableStyle = {
  cursor: "pointer",
  _hover: {
    bgColor: "gray.100",
    transition: "150ms ease-in-out",
  },
  _pressed: {
    bgColor: "gray.300",
  },
};
const Logo = () => {
  const router = useRouter();
  return (
    <Image
      src="https://images.vexels.com/media/users/3/136638/isolated/preview/8794edc043ac61418c90043b1ed63f2b-purple-flower-icon.png"
      alt="Logo"
      boxSize={32}
      p={4}
      rounded="full"
      {...selectableStyle}
      onClick={() => void router.push(RoutesEnum.Home)}
    />
  );
};
const Item = ({ item: { icon, name, to, onClick } }: { item: ListItem }) => {
  const router = useRouter();
  return (
    <Flex
      px={4}
      py={3}
      align="center"
      borderRadius={8}
      {...selectableStyle}
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
      { name: "Employees", icon: PiUsersFourBold, to: RoutesEnum.Employees },
      { name: "Projects", icon: PiBagBold, to: RoutesEnum.Projects },
      { name: "Settings", icon: BiCog, to: RoutesEnum.Settings },
    ],
    []
  );

  return (
    <Flex direction="column" bg="white" w={60} p={3} borderRightWidth={2}>
      <Logo />

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
