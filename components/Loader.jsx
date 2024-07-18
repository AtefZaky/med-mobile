import {  StyleSheet, View, ActivityIndicator, Dimensions, Platform } from "react-native";

const Loader = ({ isLoading }) => {
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View
      className="absolute flex justify-center items-center w-full h-full bg-white z-10"
      style={{
        height: screenHeight,
      }}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#227099"
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//     loaderContainer: {
//         position: "absolute",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "full",
//         height: "full",
//         backgroundColor: "white",
//         zIndex: "10"
//     }
// }
    
// );

export default Loader;
