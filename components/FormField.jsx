import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormField = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	icon,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View className={`space-y-4 ${otherStyles}`}>
			<View className={` flex flex-row justify-end`}>
				<Text className="text-base text-dark font-tbold text-right">
					{title}
				</Text>
				{icon ? (
					<Image
						source={icon}
						resizeMode="contain"
						className={`h-6 w-6 ml-1`}
					/>
				) : (
					""
				)}
			</View>
			<View className="w-full h-16 px-4 bg-#FEFEFE rounded-lg border-[0.5px] border-primary focus:border-primary flex flex-row items-center">
				{title === "كلمة المرور" && (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Image
							source={!showPassword ? icons.eyeIcon : icons.eyeIcon}
							className="w-6 h-6"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
				<TextInput
					className="flex-1 text-base text-dark font-tregular text-right"
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#2B2B2B80"
					onChangeText={handleChangeText}
					secureTextEntry={title === "كلمة المرور" && !showPassword}
					{...props}
				/>
			</View>
		</View>
	);
};

export default FormField;
