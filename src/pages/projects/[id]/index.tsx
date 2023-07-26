import { api } from "@/utils/api";
import { Spinner, Flex, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

const ProjectPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { data: project, isLoading } = api.project.getOne.useQuery(
    { id: router.query.id as string },
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  return (
    <>
      <Head>
        <title>HUMG 👻 - Project</title>
      </Head>
      {isLoading ? (
        <Spinner />
      ) : (
        <Flex>
          <Text>{JSON.stringify(project)}</Text>
        </Flex>
      )}
    </>
  );
};

export default ProjectPage;
