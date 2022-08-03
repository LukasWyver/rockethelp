import {
  Button as NativeBaseButton,
  IButtonProps,
  Heading,
  useTheme,
} from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  const { colors } = useTheme();
  return (
    <NativeBaseButton
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{ bg: "green.500" }}
      {...rest}
    >
      <Heading
        _dark={{
          color: "white",
        }}
        _light={{
          color: colors.gray[400],
        }}
        fontSize="sm"
      >
        {title}
      </Heading>
    </NativeBaseButton>
  );
}
