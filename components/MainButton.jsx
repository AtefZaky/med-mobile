// import {StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
// import { icons, colors } from "../constants";

// const MainButton = ({
//   title,
//   handlePress,
//   containerStyles,
//   textStyles,
//   isLoading,
// }) => {
//   return (
    
//     <TouchableOpacity
//       onPress={handlePress}
//       activeOpacity={0.7}
//     //   className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
//         // isLoading ? "opacity-50" : ""
//     //   }`}
//       style= {styles.btn}
//       disabled={isLoading}
//     >
//       <Text 
//     //   className={`text-primary font-psemibold text-lg ${textStyles}`}
//       style= {styles.text}>
//         {title}
//       </Text>
//       <Image source={icons.Signin} resizeMode='contain' style={styles} />
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//     btn: {
//       backgroundColor: colors.primary,
//       borderRadius: "12px",
//       minHeight: "62px",
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "center",
//       alignItems: "center"
//     },
//     text: {
//       color: 'white',
//       fontWeight: 'bold',
//       fontSize: 14,
//     },
//     icon: {
//         height: 24,
//         width: 24,
//         color: "white"
//     }
//   });

// export default MainButton;

import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";

const MainButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  icon,
  iconStyles
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary rounded-lg min-h-[62px] flex flex-row justify-center w-full items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
       {icon ? (<Image source={icon} className={`h-6 w-6 mr-6  ${iconStyles}`} />): ""} 
      <Text className={`text-white font-tbold text-lg ${textStyles} font-tregular`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default MainButton;
