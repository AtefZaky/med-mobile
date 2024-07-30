import { View, ActivityIndicator, Dimensions } from "react-native";

const Loader = ({ isLoading, minus }) => {
	const screenHeight = Dimensions.get("screen").height;

	if (!isLoading) return null;

	return (
		<View
			className="absolute flex justify-center items-center w-full h-full bg-white z-10"
			style={{
				height: screenHeight - (minus ? minus : 0),
			}}>
			<ActivityIndicator
				size={80}
				animating={isLoading}
				color="#227099"
			/>
		</View>
	);
};

export default Loader;
