import React from "react";
import { Center, Spinner, useTheme } from "native-base";

export function Loading() {
  const { colors } = useTheme();
  return (
    <Center
      flex={1}
      _dark={{
        bg: "gray.700",
      }}
      _light={{
        bg: colors.gray[75],
      }}
    >
      <Spinner color="secondary.700" />
    </Center>
  );
}
