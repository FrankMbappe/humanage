import { api } from "@/utils/api";
import { RouteEnum } from "@/utils/enums";
import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Personality } from "@prisma/client";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { getPersonFullName } from "@/utils";
import { employeeSchema } from "@/utils/schema";
import { useEffect, useMemo } from "react";

type FormData = z.infer<typeof employeeSchema>;

const EmployeeEdit: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { data: employee, isLoading } = api.employee.getOne.useQuery(
    { id: router.query.id as string },
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  const editEmployee = api.employee.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Employee edited!",
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
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(employeeSchema),
    // See https://stackoverflow.com/a/66268317
    defaultValues: useMemo(() => {
      return employee
        ? {
            ...employee,
            bio: employee.bio ?? undefined, // Optional
            picUrl: employee.picUrl ?? undefined, // Optional
          }
        : undefined;
    }, [employee]),
  });
  useEffect(() => {
    // See https://stackoverflow.com/a/66268317
    reset(
      employee
        ? {
            ...employee,
            bio: employee.bio ?? undefined, // Optional
            picUrl: employee.picUrl ?? undefined, // Optional
          }
        : undefined
    );
  }, [employee, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Data", data);
    editEmployee.mutate({
      ...data,
      id: router.query.id as string,
      bio: data.bio ?? undefined, // Optional
      picUrl: data.picUrl ?? undefined, // Optional
    });
  };

  return (
    <>
      <Head>
        <title>HUMG 👻 - Edit an employee</title>
      </Head>

      <Flex direction="column" flex={1}>
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <Stack flex={1} spacing={5}>
            <Heading>Edit employee</Heading>
            {!employee || isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <Text>Updating {getPersonFullName(employee)}</Text>
            )}
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
            <ButtonGroup alignSelf="flex-end">
              <Button onClick={() => router.back()} variant="ghost">
                Cancel
              </Button>
              <Button
                colorScheme="purple"
                isLoading={isSubmitting || editEmployee.isLoading}
                type="submit"
              >
                Update
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </Flex>
    </>
  );
};

export default EmployeeEdit;
