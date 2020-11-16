import React, { useCallback, useEffect } from "react";
import { Alert, View } from "react-native";
import { useAppContext } from "../../context";
import { SwipeListView } from "react-native-swipe-list-view";

import {
  Container,
  List,
  GrupoContainer,
  Text,
  OptionContainer,
  Button,
  ButtonText,
  ButtonHeader,
} from "./styles";
import api from "../../services";
import { useNavigation } from "@react-navigation/native";
import { grupo } from "../../hooks/reduce";
import Conversas from "../conversas";

const Grupos = () => {
  const navigation = useNavigation();
  const {
    state: { Grupos },
    getGrupos,
    setLoading,
    selectGrupo,
  } = useAppContext();

  useEffect(() => {
    getGrupos();
  }, [getGrupos]);

  const deleteGrupo = useCallback(async (id: number) => {
    Alert.alert("Atenção", "Deseja deletar esse grupo", [
      { text: "não", onPress: () => {} },
      {
        text: "sim",
        onPress: async () => {
          setLoading(true);
          const { data } = await api.delete(`grupo/${id}`, { data: { id } });
          getGrupos();
          setLoading(false);
        },
      },
    ]);
  }, []);

  const selecionaGrupo = useCallback(async (grupo: grupo) => {
    setLoading(true);
    const { data } = await api.get(`grupo/${grupo.id}/join`);
    selectGrupo(grupo);
    setLoading(false);
    navigation.navigate("Conversas");
  }, []);

  return (
    <Container>
      <List
        data={Grupos}
        renderItem={(data, rowMap) => (
          <GrupoContainer onPress={() => selecionaGrupo(data.item)}>
            <Text>{data.item.name}</Text>
          </GrupoContainer>
        )}
        renderHiddenItem={(data, rowMap) => (
          <OptionContainer>
            <Button onPress={() => deleteGrupo(data.item.id)}>
              <ButtonText>Excluir</ButtonText>
            </Button>
          </OptionContainer>
        )}
        rightOpenValue={-105}
      />
    </Container>
  );
};

export default Grupos;
