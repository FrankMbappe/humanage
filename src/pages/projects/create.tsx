import { api } from "@/utils/api";
import { RouteEnum } from "@/utils/enums";
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { projectSchema } from "@/utils/schema";
import CandidateInput from "@/components/CandidateInput";

type FormData = z.infer<typeof projectSchema>;

const ProjectCreate = () => {
  const toast = useToast();
  const router = useRouter();
  const createProject = api.project.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Project created!",
        description: "A new project has been created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      void router.push(RouteEnum.Projects);
    },
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    createProject.mutate({
      ...data,
      startDate: data.startDate || undefined, // Optional
      endDate: data.endDate || undefined, // Optional
    });
  };

  return (
    <>
      <Head>
        <title>HUMG 👻 - Create a project</title>
      </Head>

      <Flex direction="column" flex={1}>
        <form
          onSubmit={(e) =>
            void handleSubmit(onSubmit, (errors) => {
              console.log("errors", errors);
            })(e)
          }
        >
          <Stack flex={1} spacing={5}>
            <Heading>Create project</Heading>
            <FormInput
              label="Title"
              placeholder="e.g. ERP implementation"
              error={errors.title?.message}
              {...register("title")}
            />
            <Stack direction="row">
              <FormInput
                label="Start date"
                type="date"
                error={errors.startDate?.message}
                {...register("startDate")}
              />
              <FormInput
                label="End date"
                type="date"
                error={errors.endDate?.message}
                {...register("endDate")}
              />
            </Stack>
            <FormInput
              label="Team size"
              placeholder="e.g. 3"
              type="number"
              error={errors.teamSize?.message}
              {...register("teamSize", { valueAsNumber: true })}
            />
            <CandidateInput
              label="Candidates"
              name="candidateIds"
              control={control}
              error={errors.candidateIds?.message}
            />
            <ButtonGroup alignSelf="flex-end">
              <Button onClick={() => router.back()} variant="ghost">
                Cancel
              </Button>
              <Button
                colorScheme="purple"
                isLoading={isSubmitting || createProject.isLoading}
                type="submit"
              >
                Save
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </Flex>
    </>
  );
};

export default ProjectCreate;
