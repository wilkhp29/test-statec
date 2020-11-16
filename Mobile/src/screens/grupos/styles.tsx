import styled from "styled-components/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { heightPercentageToDP, widthPercentageToDP } from "../../helps";

export const Container = styled.View``;

export const List = styled(SwipeListView)``;

export const GrupoContainer = styled.TouchableOpacity`
  background-color: white;
  padding: ${heightPercentageToDP(`4%`)}px;
`;

export const Text = styled.Text`
  font-size: ${heightPercentageToDP(`3%`)}px;
`;

export const OptionContainer = styled.View`
  width: ${widthPercentageToDP("100%")}px;
  align-items: flex-end;
`;

export const Button = styled.TouchableOpacity`
  background: red;
  width: 110px;
  align-items: center;
  padding: 25px;
`;

export const ButtonHeader = styled.TouchableOpacity``;
export const ButtonText = styled.Text`
  font-size: ${heightPercentageToDP(`3%`)}px;
  color: white;
`;
