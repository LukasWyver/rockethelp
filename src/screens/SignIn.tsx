import { useState, useEffect } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
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
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const [tooManyRequests, setTooManyRequests] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !password) {
      //return Alert.alert("Entrar", "Informe e-mail e senha.");
      setEmailIsInvalid(true);
      setPasswordIsInvalid(true);
      return;
    }

    if (password.length < 6) {
      return setPasswordError(true);
    }

    setEmailIsInvalid(false);
    setPasswordIsInvalid(false);
    setPasswordError(false);
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          //Alert.alert("Entrar", "e-mail inválido.");
          return setEmailIsInvalid(true);
        }

        if (error.code === "auth/wrong-password") {
          //Alert.alert("Entrar", "senha inválida.");
          return setPasswordIsInvalid(true);
        }

        if (error.code === "auth/user-not-found") {
          //Alert.alert("Entrar", "e-mail inválida.");
          return setEmailIsInvalid(true);
        }

        if (error.code === "auth/too-many-requests") {
          //Alert.alert("Entrar", "muitas tentativas, por favor aguarde.");
          return setTooManyRequests(true);
        }

        return Alert.alert("Entrar", "Não foi possivel acessar");
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <FormControl mb={4} isInvalid={emailIsInvalid}>
        <Input
          placeholder="E-mail"
          InputLeftElement={
            <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
          }
          onChangeText={setEmail}
        />
        <FormControl.ErrorMessage
          leftIcon={<WarningOutlineIcon size="xs" mr={1} />}
        >
          e-mail invalido! por favor, verifique.
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl mb={8} isInvalid={passwordIsInvalid}>
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
        {passwordError && (
          <FormControl.HelperText>
            digite uma senha de no minimo 6 digitos.
          </FormControl.HelperText>
        )}

        {tooManyRequests && (
          <FormControl.HelperText>
            muitas tentativas, por favor aguarde.
          </FormControl.HelperText>
        )}

        <FormControl.ErrorMessage
          leftIcon={<WarningOutlineIcon size="xs" mr={1} />}
        >
          senha invalida! por favor, verifique.
        </FormControl.ErrorMessage>
      </FormControl>

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
