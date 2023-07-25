import { RouteEnum } from "@/utils/enums";
import { Image, type ImageProps } from "@chakra-ui/react";
import { useRouter } from "next/router";

const selectableStyle = {
  p: 4,
  cursor: "pointer",
  _hover: {
    bgColor: "gray.100",
    transition: "150ms ease-in-out",
  },
  _pressed: {
    bgColor: "gray.300",
  },
};

const Logo = ({
  isSelectable,
  ...props
}: ImageProps & { isSelectable?: boolean }) => {
  const router = useRouter();

  return (
    <Image
      src="https://images.vexels.com/media/users/3/136638/isolated/preview/8794edc043ac61418c90043b1ed63f2b-purple-flower-icon.png"
      alt="HMG Logo"
      boxSize={32}
      rounded="full"
      {...(isSelectable && {
        ...selectableStyle,
        onClick: () => void router.push(RouteEnum.Home),
      })}
      {...props}
    />
  );
};

export default Logo;
