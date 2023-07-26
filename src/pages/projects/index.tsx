import Head from "next/head";
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { api } from "@/utils/api";
import { RouteEnum } from "@/utils/enums";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FiRefreshCcw } from "react-icons/fi";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const {
    data: projects,
    refetch: refetchProjects,
    isLoading,
    isError,
  } = api.project.getAll.useQuery(
    undefined, // No input
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  const onCreateBtnClick = () => {
    void router.push(RouteEnum.ProjectCreate);
  };

  return (
    <>
      <Head>
        <title>HUMG 👻 - Projects</title>
      </Head>

      <Flex direction="column" w="full">
        <Flex direction="column">
          <Heading>Projects</Heading>
          <Text mt={2}>
            Create, edit, and delete projects of your organization
          </Text>
        </Flex>

        {isError ? (
          <Text color="red">Something went wrong</Text>
        ) : (
          <Flex direction="column" mt={4} w="full">
            <Flex justify="space-between" align="center" w="full">
              <Text fontWeight="bold">
                {projects ? `${projects.length} record(s)` : "Loading..."}
              </Text>
              <ButtonGroup size="sm" isDisabled={isLoading || isError}>
                <IconButton
                  icon={<Icon as={FiRefreshCcw} />}
                  aria-label="Refresh table"
                  variant="outline"
                  isLoading={isLoading}
                  onClick={() => void refetchProjects()}
                />
                <Button colorScheme="purple" onClick={onCreateBtnClick}>
                  New
                </Button>
              </ButtonGroup>
            </Flex>

            <SimpleGrid mt={4} columns={{ sm: 1, md: 3, xl: 4 }}>
              {projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </SimpleGrid>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Projects;
