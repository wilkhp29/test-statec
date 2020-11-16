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
      console.log("dados", data);
      addMensagens(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const userOn = useCallback(async () => {
    const user = await getUser();
    setUser(user);
  }, []);

  const sendMensage = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`grupo/${Grupo?.id}/mensagens`, { msg });
      setMsg("");
    } finally {
      setLoading(false);
    }
  }, [msg]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: Grupo?.name });
  }, [navigation]);

  useEffect(() => {
    getMensagem();
  }, [getMensagem]);

  useEffect(() => {
    userOn();
  }, [userOn]);

  useEffect(() => {
    console.log("mensagens", Mensagens);
  }, [Mensagens]);

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
                {mensagem.Usuario.email} diz:{mensagem.mensagens}
              </Other>
            )}
          </>
        ))}
      </Scroll>
      <ContainerInput>
        <Input value={msg} onChangeText={(text) => setMsg(text)} />
        <Button title="send" onPress={() => sendMensage()} />
      </ContainerInput>
    </Container>
  );
};

export default Conversas;
