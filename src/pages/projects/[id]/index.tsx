import CandidateInput from "@/components/CandidateInput";
import { type Composition } from "@/models";
import { api } from "@/utils/api";
import { getCompositions } from "@/utils/project";
import {
  Spinner,
  Flex,
  Text,
  Stack,
  SimpleGrid,
  Heading,
  ButtonGroup,
  IconButton,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Composer from "@/components/Composer";
import { formatAsPercentage } from "@/utils";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi";

const ProjectPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { data: project, isLoading } = api.project.getOne.useQuery(
    { id: router.query.id as string },
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  const compositions = useMemo<Composition[]>(
    () =>
      project ? getCompositions(project.candidates, project.teamSize) : [],
    [project]
  );
  const [candidateIds, setCandidateIds] = useState(
    project?.candidates.map((c) => c.id)
  );
  const [activeComposition, setActiveComposition] = useState(compositions[0]);
  useEffect(() => {
    setCandidateIds(project?.candidates.map((c) => c.id));
  }, [project]);
  useEffect(() => {
    setActiveComposition(compositions[0]);
  }, [compositions]);

  return (
    <>
      <Head>
        <title>HUMG 👻 - Project</title>
      </Head>
      {isLoading || !project ? (
        <Flex boxSize="full" align="center" justify="center">
          <Spinner />
        </Flex>
      ) : (
        <Flex direction="column" w="full">
          <SimpleGrid columns={{ md: 2 }}>
            <Stack>
              <p>ABC</p>
            </Stack>

            <Flex direction="column">
              <Flex justify="space-between" align="center">
                <ButtonGroup isAttached>
                  <IconButton
                    icon={<Icon as={FiChevronLeft} boxSize={8} />}
                    aria-label="Left"
                    variant="ghost"
                    isDisabled
                  />
                  <IconButton
                    icon={<Icon as={FiChevronRight} boxSize={8} />}
                    aria-label="Right"
                    variant="ghost"
                  />
                </ButtonGroup>

                <ButtonGroup>
                  <Button colorScheme="purple">Save</Button>
                  <IconButton
                    icon={<Icon as={FiMoreHorizontal} />}
                    aria-label="More"
                    variant="outline"
                  />
                </ButtonGroup>
              </Flex>
              <Heading letterSpacing="normal" mt={6}>
                {activeComposition?.members.map((m) => m.firstName).join(", ")}
              </Heading>
              <Text mt={4}>
                ✅{" "}
                <Text as="span" fontWeight="bold">
                  {formatAsPercentage(activeComposition?.compatibilityAvg ?? 0)}
                </Text>{" "}
                compatibility
              </Text>
              <Text mt={8} fontSize="sm" fontWeight="bold">
                MORE COMPS ({compositions.length})
              </Text>
              <Composer
                compositions={compositions}
                value={activeComposition}
                onChange={(composition) =>
                  setActiveComposition(composition as Composition)
                }
              />
            </Flex>
          </SimpleGrid>

          <Stack w="full" spacing={3} mt={4}>
            <Text fontSize="sm" fontWeight="bold">
              CANDIDATES ({candidateIds?.length ?? "..."})
            </Text>
            <CandidateInput
              inputProps={{
                value: candidateIds,
              }}
            />
          </Stack>
        </Flex>
      )}
    </>
  );
};

export default ProjectPage;
