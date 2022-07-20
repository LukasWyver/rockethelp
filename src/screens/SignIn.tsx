import { useState } from "react";
import Logo from "../assets/logo_primary.svg";
import {
  VStack,
  Heading,
  Icon,
  useTheme,
  FormControl,
  WarningOutlineIcon,
} from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";

export function SignIn() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);

  const { colors } = useTheme();

  function passwordCheck() {
    if (password.length < 6 && password.length > 12) {
      setPasswordChecked(true);
    }
    return;
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <FormControl mb={4} isInvalid>
        <Input
          placeholder="E-mail"
          InputLeftElement={
            <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
          }
          onChangeText={setName}
        />
      </FormControl>
      <FormControl mb={8}>
        <Input
          placeholder="Senha"
          type={show ? "text" : "password"} // secureTextEntry
          InputLeftElement={
            <Icon as={<Key color={colors.gray[300]} />} ml={4} />
          }
          onChangeText={setPassword}
          InputRightElement={
            <Icon
              as={
                <MaterialIcons name={show ? "visibility" : "visibility-off"} />
              }
              size={5}
              mr={4}
              color={colors.gray[300]}
              onPress={() => setShow(!show)}
            />
          }
        />

        {passwordChecked ? (
          <FormControl.ErrorMessage
            leftIcon={<WarningOutlineIcon size="xs" mr={1} />}
          >
            senha invalida! por favor, verifique.
          </FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText>
            digite uma senha de no minimo 6 e até 12 digitos.
          </FormControl.HelperText>
        )}
      </FormControl>
      <Button title="Entrar" w="full" />
    </VStack>
  );
}
