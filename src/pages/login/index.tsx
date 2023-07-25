import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { type NextPageWithLayout } from "../_app";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import Logo from "@/components/Logo";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { RouteEnum } from "@/utils/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormData = { email: string };
const formSchema = z.object({
  email: z.string().email(),
});

const Login: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = handleSubmit(async (values) => {
    console.log("values", values);
    await signIn("email", { email: values.email });
  });

  useEffect(() => {
    if (!!sessionData) void router.replace(RouteEnum.Home);
  }, [router, sessionData]);

  return (
    <Flex direction="column" minH="100vh" justify="center" align="center">
      <Logo />
      <form onSubmit={(e) => void onSubmit(e)}>
        <Stack align="center" spacing={6} mt={8}>
          <p>{JSON.stringify(getValues())}</p>
          <FormControl w="sm" isInvalid={!!errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
              id="email"
              placeholder="e.g., abc@example.com"
              type="email"
              {...register("email", { required: true })}
            />
            <FormHelperText>{"We'll never share your email."}</FormHelperText>
            {!!errors.email && (
              <FormErrorMessage> {errors.email.message} </FormErrorMessage>
            )}
          </FormControl>
          <Button colorScheme="purple" isLoading={isSubmitting} type="submit">
            Sign in
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

Login.hasNoLayout = true;

export default Login;
