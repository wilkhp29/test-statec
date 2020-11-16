import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { useAppContext } from "../../context";
import api from "../../services";

const Conversas = () => {
  const {
    state: { Grupo },
    setLoading,
    addMensagens,
  } = useAppContext();
  const navigation = useNavigation();

  const getMensagem = useCallback(async () => {
    setLoading(true);
    const { data } = await api.get(`grupo/${Grupo?.id}/mensagens`);
    addMensagens(data);
    setLoading(false);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ title: Grupo?.name });
  }, [navigation]);

  useEffect(() => {
    getMensagem();
  }, [getMensagem]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Conversas </Text>
    </View>
  );
};

export default Conversas;
