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
  Avatar,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Composer from "@/components/Composer";
import { formatAsPercentage, getSpectrumValue } from "@/utils";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import CompatibilityTree from "@/components/CompatibilityTree";

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
        <Flex direction="column" w="full" pt={2}>
          <SimpleGrid columns={{ md: 2 }} spacing={8}>
            <Stack>
              <Flex align="center">
                <Avatar
                  size="lg"
                  src="https://i.pinimg.com/1200x/b7/11/0b/b7110b476d2bae9bd4abc45eb6131778.jpg"
                />
                <Flex direction="column" ms={4}>
                  <Heading fontSize="28px">{project.title}</Heading>
                  <Text color="gray" mt={1} fontSize="sm">
                    {formatDistanceToNow(project.createdAt, {
                      addSuffix: true,
                    })}
                  </Text>
                </Flex>
              </Flex>
              {!!activeComposition && (
                <CompatibilityTree composition={activeComposition} />
              )}
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
              <Heading letterSpacing="normal" mt={8} fontSize="28px">
                {activeComposition?.members.map((m) => m.firstName).join(", ")}
              </Heading>
              <Text mt={4}>
                {getSpectrumValue(
                  (activeComposition?.compatibilityAvg ?? 0) * 100,
                  ["😃🎉", "😊", "🙂", "🫤"]
                )}{" "}
                <Text as="span" fontWeight="bold">
                  {formatAsPercentage(activeComposition?.compatibilityAvg ?? 0)}
                </Text>{" "}
                compatibility
              </Text>
              <Text mt={8} mb={2} fontSize="sm" fontWeight="bold">
                COMPOSITIONS ({compositions.length})
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

          <Flex direction="column" w="full" mt={8}>
            <Text fontSize="sm" fontWeight="bold" mb={3}>
              CANDIDATES ({candidateIds?.length ?? "..."})
            </Text>
            <CandidateInput
              inputProps={{
                value: candidateIds,
              }}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ProjectPage;
