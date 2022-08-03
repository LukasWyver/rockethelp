import { useState } from "react";
import { Alert } from "react-native";
import { useTheme, VStack } from "native-base";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Register() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert("Cadastrar", "Primeiro preencha todos os campos.");
    }

    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert(
          "Solicitação",
          "Não foi possivel registrar o pedido."
        );
      });
  }

  return (
    <VStack
      flex={1}
      p={6}
      _dark={{
        bg: "gray.600",
      }}
      _light={{
        bg: colors.gray[50],
      }}
    >
      <Header title="Solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        value={patrimony}
        onChangeText={setPatrimony}
      />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}
