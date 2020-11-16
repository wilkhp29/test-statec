import { useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { managers } from "socket.io-client";
import { useAppContext } from "../../context";
import api, { getUser } from "../../services";

import {
  Container,
  Scroll,
  My,
  All,
  Other,
  ContainerInput,
  Input,
  Button,
} from "./styles";

const Conversas = () => {
  const {
    state: { Grupo, Mensagens },
    setLoading,
    addMensagens,
    removeGrupo,
  } = useAppContext();
  const navigation = useNavigation();
  const [user, setUser] = useState<any>();
  const [msg, setMsg] = useState<string>("");

  const getMensagem = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`grupo/${Grupo?.id}/mensagens`);
      addMensagens(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const userOn = useCallback(async () => {
    try {
      const user = await getUser();
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const sendMensage = useCallback(async () => {
    if (msg.trim() === "") {
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post(`grupo/${Grupo?.id}/mensagens`, {
        msg: msg.trim(),
      });
      setMsg("");
    } finally {
      setLoading(false);
    }
  }, [msg]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: Grupo?.name });
    userOn();
  }, [navigation, userOn]);

  useEffect(() => {
    getMensagem();
  }, [getMensagem]);

  return (
    <Container>
      <Scroll>
        {Mensagens.map((mensagem) => (
          <>
            {user?.id === mensagem.Usuario?.id ? (
              <My>{mensagem.mensagens}</My>
            ) : mensagem.Usuario === null ? (
              <All>{mensagem.mensagens}</All>
            ) : (
              <Other>
                {mensagem.Usuario?.email} diz:{mensagem.mensagens}
              </Other>
            )}
          </>
        ))}
      </Scroll>
      <ContainerInput>
        <Input
          value={msg}
          onChangeText={(text) => setMsg(text)}
          onSubmitEditing={() => sendMensage()}
        />
        <Button title="send" onPress={() => sendMensage()} />
      </ContainerInput>
    </Container>
  );
};

export default Conversas;
