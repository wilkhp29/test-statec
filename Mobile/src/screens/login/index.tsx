import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { Alert, Platform, TextInput } from "react-native";
import Api, { saveToken } from "../../services";
import {
  Container,
  Title,
  Label,
  Row,
  Form,
  Input,
  FormTitle,
  Scroll,
  LoginButton,
  ButtonText,
} from "./styles";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const Password = useRef<TextInput>(null);

  const Logar = useCallback(async () => {
    if (email?.trim() === "" || password?.trim() === "") {
      Alert.alert("Atencão", "Preencha os campos para continuar", [
        { text: "ok", onPress: () => {} },
      ]);
      return;
    }

    const { data } = await Api.post("register", {
      email,
      password,
    });
    saveToken(data);
    navigation.navigate("Grupos");
  }, [email, password]);

  return (
    <Container>
      <Title>Statec</Title>
      <Scroll>
        <Form
          behavior={Platform.select({
            ios: "padding",
            android: null,
          })}
        >
          <FormTitle>Login</FormTitle>
          <Row>
            <Label>Email / Nome</Label>
            <Input
              value={email}
              onChangeText={(text) => setEmail(text)}
              onSubmitEditing={() => Password.current?.focus()}
              returnKeyType="next"
            />
          </Row>
          <Row marginTop={20}>
            <Label>Password</Label>
            <Input
              ref={Password}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              onSubmitEditing={() => Logar()}
              returnKeyType="done"
            />
          </Row>
          <LoginButton onPress={() => Logar()}>
            <ButtonText>Logar</ButtonText>
          </LoginButton>
        </Form>
      </Scroll>
    </Container>
  );
};

export default Login;
