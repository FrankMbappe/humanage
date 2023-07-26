import { api } from "@/utils/api";
import { RouteEnum } from "@/utils/enums";
import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Personality } from "@prisma/client";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";

const validationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  jobPosition: z.string().min(1, { message: "Job position is required" }),
  picUrl: z.string().optional(),
  bio: z.string().optional(),
  personality: z.nativeEnum(Personality),
});
type FormData = z.infer<typeof validationSchema>;

const EmployeeCreate = () => {
  const toast = useToast();
  const router = useRouter();
  const createEmployee = api.employee.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Employee created!",
        description: "A new employee has been created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      void router.push(RouteEnum.Employees);
    },
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Data", data);
    createEmployee.mutate({
      ...data,
      bio: data.bio ?? undefined, // Optional
      picUrl: data.picUrl ?? undefined, // Optional
    });
  };

  return (
    <>
      <Head>
        <title>HUMG 👻 - Create an employee</title>
      </Head>

      <Flex direction="column" flex={1}>
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <Stack flex={1} spacing={5}>
            <Heading>Create employee</Heading>
            <Flex align="center">
              <Avatar size="lg" me={4} src={watch("picUrl")} />
              <FormInput
                label="Picture URL"
                placeholder="https://image.com/example.png"
                {...register("picUrl")}
              />
            </Flex>
            <FormInput
              id="firstName"
              label="First name"
              placeholder="e.g. Jane"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
            <FormInput
              label="Last name"
              placeholder="e.g. Doe"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
            <FormInput
              label="Job position"
              placeholder="e.g. Sales Manager"
              error={errors.jobPosition?.message}
              {...register("jobPosition")}
            />
            <FormInput
              label="Bio"
              placeholder="Biography"
              error={errors.bio?.message}
              {...register("bio")}
            />
            <FormSelect
              label="Personality"
              placeholder="Select a personality..."
              error={errors.personality?.message}
              {...register("personality")}
            >
              {Object.values(Personality).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </FormSelect>
            <ButtonGroup>
              <Button onClick={() => router.back()} variant="ghost">
                Cancel
              </Button>
              <Button
                colorScheme="purple"
                isLoading={isSubmitting || createEmployee.isLoading}
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

export default EmployeeCreate;
