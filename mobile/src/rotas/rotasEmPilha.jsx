import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { TelaInicial } from "../telas/TelaInicial";
import { TelaDoJogo } from "../telas/TelaDoJogo";

const { Navigator, Screen } = createNativeStackNavigator();

export function RotasEmPilha() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        name="telaInicial"
        component={TelaInicial}
      />
      <Screen
        name="telaDoJogo"
        component={TelaDoJogo}
      />
    </Navigator>
  )
}