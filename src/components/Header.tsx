import {
  Heading,
  HStack,
  IconButton,
  useTheme,
  StyledProps,
  useColorMode,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { CaretLeft } from "phosphor-react-native";

type Props = StyledProps & {
  title: string;
};

export function Header({ title, ...rest }: Props) {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const navigation = useNavigation();

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      _dark={{
        bg: "gray.600",
      }}
      _light={{
        bg: colors.gray[50],
      }}
      pb={6}
      pt={12}
      {...rest}
    >
      <IconButton
        icon={
          <CaretLeft
            color={colorMode === "light" ? colors.gray[300] : colors.gray[200]}
            size={24}
          />
        }
        rounded="sm"
        // _pressed={{ bg: "gray.500" }}

        onPress={() => navigation.goBack()}
      />
      <Heading
        _dark={{
          color: "gray.100",
        }}
        _light={{
          color: colors.gray[300],
        }}
        textAlign="center"
        fontSize="lg"
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  );
}
