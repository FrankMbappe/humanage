import { Flex } from "@chakra-ui/react";
import SideBar from "../SideBar";
import { type ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex minH="100vh" justify="center">
      <Flex
        maxW="container.xl"
        flex="1"
        borderWidth={2}
        borderColor="red"
        borderStyle="dashed"
      >
        <SideBar />
        <Flex flex="1">{children}</Flex>
      </Flex>
    </Flex>
  );
};

export default HomeLayout;
