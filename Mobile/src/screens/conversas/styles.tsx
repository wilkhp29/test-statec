import styled from "styled-components/native";
import { color } from "../../helps";

export const Container = styled.View`
  padding: 5px;
  display: flex;
  flex: 1;
`;
export const Scroll = styled.ScrollView`
  display: flex;
  flex: 1;
`;
export const My = styled.Text`
  padding: 10px;
  border-radius: 5px;
  text-align: right;
  color: white;
  background-color: ${color.primary};
  margin-top: 5px;
`;
export const Other = styled.Text`
  padding: 10px;
  border-radius: 5px;
  background-color: greenyellow;
  margin-top: 5px;
`;
export const All = styled.Text``;

export const ContainerInput = styled.View`
  flex-direction: row;
`;
export const Input = styled.TextInput`
  display: flex;
  flex: 1;
  border: 1px solid ${color.warmGray};
`;
export const Button = styled.Button``;
