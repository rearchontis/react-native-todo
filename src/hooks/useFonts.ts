import {
  useFonts as _useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
} from "@expo-google-fonts/roboto";

function useFonts(): ReturnType<typeof _useFonts> {
  return _useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
  });
}

export default useFonts;
