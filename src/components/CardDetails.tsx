import { ReactNode } from "react";
import { IconProps } from "phosphor-react-native";
import { VStack, HStack, Text, Box, useTheme, useColorMode } from "native-base";

type Props = {
  title: string;
  description: string;
  footer?: string;
  icon: React.ElementType<IconProps>;
  children?: ReactNode;
};

export function CardDetails({
  title,
  description,
  footer = null,
  icon: Icon,
  children,
}: Props) {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <VStack
      _dark={{
        bg: "gray.600",
      }}
      _light={{
        bg: colors.gray[100],
      }}
      p={5}
      mt={5}
      rounded="sm"
    >
      <HStack alignItems="center" mb={4}>
        <Icon color={colors.primary[700]} />
        <Text
          ml={2}
          _dark={{
            color: "gray.300",
          }}
          _light={{
            color: colors.gray[400],
          }}
          fontSize="sm"
          textTransform="uppercase"
        >
          {title}
        </Text>
      </HStack>

      {!!description && (
        <Text
          _dark={{
            color: "gray.100",
          }}
          _light={{
            color: colors.gray[300],
          }}
          fontSize="md"
        >
          {description}
        </Text>
      )}

      {children}

      {!!footer && (
        <Box
          borderTopWidth={1}
          borderTopColor={colorMode === "light" ? colors.gray[200] : "gray.400"}
          mt={3}
        >
          <Text
            mt={3}
            _dark={{
              color: "gray.300",
            }}
            _light={{
              color: colors.gray[200],
            }}
            fontSize="sm"
          >
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
}
