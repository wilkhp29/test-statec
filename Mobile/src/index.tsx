import React, { useCallback, useState } from "react";
import Login from "./screens/login";
import Grupos from "./screens/grupos";
import Conversas from "./screens/conversas";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View } from "react-native";
import { ButtonHeader } from "./screens/grupos/styles";
import { ButtonText } from "./screens/login/styles";
import api from "./services";
import { useAppContext } from "./context";
import prompt from "@powerdesigninc/react-native-prompt";

const Stack = createStackNavigator();

const Rota = () => {
  const {
    state: { loading },
    getGrupos,
    setLoading,
  } = useAppContext();
  const addGroupe = useCallback(() => {
    prompt("Criar um grupo", "adicione o nome do grupo", async (name) => {
      setLoading(true);
      const { data } = await api.post("grupo", { name });
      getGrupos();
      setLoading(false);
    });
  }, []);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerTitleAlign: "center" }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Grupos"
            component={Grupos}
            options={{
              headerLeft: () => <View />,
              headerRight: () => (
                <ButtonHeader onPress={() => addGroupe()}>
                  <ButtonText>Add grupo</ButtonText>
                </ButtonHeader>
              ),
            }}
          />
          <Stack.Screen name="Conversas" component={Conversas} />
        </Stack.Navigator>
      </NavigationContainer>
      {loading && (
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.6)",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </>
  );
};

export default Rota;
