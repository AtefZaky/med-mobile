import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";

const MainButton = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
	icon,
	iconStyles,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-primary rounded-lg min-h-[62px] flex flex-row justify-center w-full items-center ${containerStyles} ${
				isLoading ? "opacity-50" : ""
			}`}
			disabled={isLoading}>
			{icon ? (
				<Image
					source={icon}
					className={`h-6 w-6 mr-6  ${iconStyles}`}
				/>
			) : (
				""
			)}
			<Text
				className={`text-white font-tbold text-lg ${textStyles} font-tregular`}>
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
