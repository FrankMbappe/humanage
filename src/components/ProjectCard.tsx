import { getPersonFullName } from "@/utils";
import { RouteEnum } from "@/utils/enums";
import {
  Avatar,
  AvatarGroup,
  Flex,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { type Employee, type Project } from "@prisma/client";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useRouter } from "next/router";
import { FiMoreVertical } from "react-icons/fi";

type Props = {
  project: Project & {
    candidates: Employee[];
  };
};

const ProjectCard = ({ project }: Props) => {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      borderWidth={1}
      rounded="lg"
      p={3}
      cursor="pointer"
      transition="150ms ease-in-out"
      _hover={{
        shadow: "lg",
        transition: "150ms ease-in-out",
        transform: "translateY(-5%)",
      }}
      _pressed={{
        bgColor: "gray.300",
      }}
      onClick={() => {
        void router.push(`${RouteEnum.Projects}/${project.id}`);
      }}
    >
      <Flex justify="space-between" align="center">
        <Text ps={1} fontSize="sm" color="gray">
          {formatDistanceToNow(project.createdAt, { addSuffix: true })}
        </Text>
        <IconButton
          icon={<Icon as={FiMoreVertical} />}
          aria-label="More"
          variant="outline"
        />
      </Flex>
      <Text fontSize="2xl" mt={3} fontWeight="black">
        {project.title}
      </Text>
      <Text>{project.teamSize} to be selected</Text>
      <AvatarGroup mt={4} size="md" max={3}>
        {project.candidates.map((employee) => (
          <Avatar
            key={employee.id}
            name={getPersonFullName(employee)}
            src={employee.picUrl ?? undefined}
          />
        ))}
      </AvatarGroup>
    </Flex>
  );
};

export default ProjectCard;
