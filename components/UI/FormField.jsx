import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../../constants";

const FormField = ({
	haveTitle = true,
	title,
	value,
	handlePress,
	placeholder,
	handleChangeText,
	otherStyles,
	icon,
	inputIcon,
	blurFunction,
	disableChat,
	FocusFunction,
	inputIconUser,
	numeric = false,
	editable = true,
	inputStyle,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const handleDecimalInput = (text, setValue) => {
		const validatedText = text.replace(/[^0-9.]/g, ""); // Allow only numbers and decimal points
		setValue(validatedText);
	};
	return (
		<View className={`space-y-2 ${otherStyles}`}>
			{haveTitle && (
				<View className={`flex flex-row justify-end`}>
					<Text className=" text-dark font-tbold text-right">{title}</Text>

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
			)}
			<View className="w-full h-14 px-4 bg-#FEFEFE rounded-lg border-[0.5px] border-primary focus:border-primary flex flex-row items-center">
				{title === "كلمة المرور" && (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Image
							source={!showPassword ? icons.eyeIcon : icons.eyeSlash}
							className="w-6 h-6"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
				{inputIcon && (
					<TouchableOpacity
						className="bg-[#227099] w-8 h-8 rounded-md justify-center items-center "
						onPress={() => handlePress()}
						disabled={disableChat}>
						<Image
							source={inputIcon}
							className="w-6 h-6"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
				{inputIconUser && (
					<TouchableOpacity
						className="rounded-md justify-center items-center "
						onPress={() => handlePress()}
						disabled={disableChat}>
						<Image
							source={inputIconUser}
							className="w-6 h-6"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
				<TextInput
					autoCapitalize={"none"}
					editable={editable ? true : false}
					multiline={title !== "كلمة المرور"}
					className={`flex-1 text-base text-dark font-tregular text-right leading-5
						 ${inputStyle ? inputStyle : ""}
						`}
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#2B2B2B80"
					onChangeText={(e) => {
						if (numeric) handleDecimalInput(e, handleChangeText);
						else handleChangeText(e);
					}}
					secureTextEntry={!showPassword}
				/>
			</View>
		</View>
	);
};

export default FormField;
