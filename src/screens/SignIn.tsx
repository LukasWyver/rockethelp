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

const VALID_EMAIL_EXPRESSION =
  /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const [tooManyRequests, setTooManyRequests] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { colors } = useTheme();

  function handleSignIn() {
    if (email.trim() === "") {
      return setEmailIsInvalid(true);
    }

    if (!VALID_EMAIL_EXPRESSION.test(email.toLowerCase())) {
      return setEmailIsInvalid(true);
    }

    if (password.trim() === "") {
      return setPasswordIsInvalid(true);
    }

    if (password.length < 6) {
      return setPasswordError(true);
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then()
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
    <VStack
      flex={1}
      alignItems="center"
      _dark={{
        bg: "gray.600",
      }}
      _light={{
        bg: colors.gray[50],
      }}
      px={8}
      pt={24}
    >
      <Logo />
      <Heading
        _dark={{
          color: "gray.100",
        }}
        _light={{
          color: colors.gray[300],
        }}
        fontSize="xl"
        mt={20}
        mb={6}
      >
        Acesse sua conta
      </Heading>
      <FormControl mb={4} isInvalid={emailIsInvalid}>
        <Input
          placeholder="E-mail"
          keyboardType="email-address"
          InputLeftElement={
            <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
          }
          onChangeText={setEmail}
          autoComplete="email"
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
