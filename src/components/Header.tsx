import {
  useDisclosure,
  Flex,
  IconButton,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Avatar,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import Logo from "./Logo";
import SideBar from "./SideBar";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      pos="sticky"
      top={0}
      bg="white"
      align="center"
      justify="space-between"
      pb={3}
      borderBottomWidth={1}
      mb={2}
    >
      <>
        <IconButton
          icon={<Icon as={FiMenu} />}
          aria-label="Menu"
          variant="outline"
          onClick={onOpen}
        />
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <SideBar p={0} w="full" borderWidth={0} onItemClick={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
      <Logo boxSize={8} />
      <Avatar size="sm" />
    </Flex>
  );
};
export default Header;
