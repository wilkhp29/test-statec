import styled from "styled-components/native";
import { heightPercentageToDP, color, widthPercentageToDP } from "../../helps";

interface RowProp {
  marginTop: Number;
}

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${color.primary};
  padding: ${heightPercentageToDP("2%")}px;
`;

export const Title = styled.Text`
  color: white;
  text-align: center;
  font-size: ${heightPercentageToDP("4%")}px;
  margin-top: ${heightPercentageToDP("4%")}px;
`;

export const Scroll = styled.ScrollView``;

export const Form = styled.KeyboardAvoidingView`
  background-color: white;
  flex: 1;
  margin-top: ${heightPercentageToDP("7%")}px;
  margin-bottom: ${heightPercentageToDP("2%")}px;
  border-radius: 10px;
  elevation: 5;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 2px 2px;
  shadow-radius: 10px;
  shadow-opacity: 1;
`;

export const FormFields = styled.View`
  flex: 1;
  padding: ${widthPercentageToDP("5%")}px;
`;

export const Input = styled.TextInput`
  border: solid 1px ${color.warmGray};
  border-radius: ${widthPercentageToDP("2%")}px;
`;

export const FormTitle = styled.Text`
  color: ${color.niceBlue};
  font-size: ${heightPercentageToDP("4%")}px;
  text-align: center;
  margin-top: ${widthPercentageToDP("5%")}px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: rgb(243, 243, 243);
  padding: ${widthPercentageToDP("7%")}px;
  margin: ${widthPercentageToDP("5%")}px;
`;

export const Row = styled.View<RowProp>`
  margin-top: ${(p) => (p.marginTop ? p.marginTop : 0)}px;
  flex-direction: column;
  justify-content: ${(p) => (p.justify ? p.justify : "space-between")};
  margin-horizontal: ${widthPercentageToDP("5%")}px;
`;

export const Label = styled.Text`
  font-size: 15px;
  color: ${color.warmGray};
`;

export const ButtonText = styled.Text`
  color: black;
  text-align: center;
  font-size: 20px;
`;

export const Switch = styled.Switch`
  margin-left: 10px;
`;
