import {
  Input as NativeBaseInput,
  IInputProps,
  useTheme,
  useColorMode,
} from "native-base";

export function Input({ ...rest }: IInputProps) {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <NativeBaseInput
      _dark={{
        bg: "gray.700",
      }}
      _light={{
        bg: colors.gray[100],
      }}
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color={colorMode === "light" ? colors.gray[400] : "white"}
      placeholderTextColor={
        colorMode === "light" ? colors.gray[200] : "gray.300"
      }
      _focus={{
        borderWidth: 1,
        borderColor: "green.500",
      }}
      {...rest}
    />
  );
}
