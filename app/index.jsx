import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { icons, roles } from "../constants";
import { MainButton, FormField, LogoBar } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { login } from "../utils/api";

const Welcome = () => {
	const { setUser, setIsLogged, isLogged, user } = useGlobalContext();
	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		username: "",
		password: "",
	});
	const router = useRouter(); // To programmatically navigate

	const submit = async () => {
		if (form.username === "" || form.password === "") {
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: "من فضلك ادخل البيانات المطلوبه",
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});
			return; // Prevent form submission if fields are empty
		}

		setSubmitting(true);

		try {
			const result = await login(form.username, form.password);
			console.log(result);
			setUser({
				username: result.username,
				lastActive: result.lastActive,
				type: result.UserTypeID,
				DepartmentID: result.UserDepartmentID,
				UserDepartmentName: result.UserDepartmentName,
			});
			setIsLogged(true);

			Toast.show({
				type: "success",
				text1: "عملية ناجحه",
				text2: "تم تسجيل الدخول بنجاح",
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});

			setTimeout(() => {
				if (result.UserTypeID === roles.operator) {
					setSubmitting(false);
					router.replace("/home");
				} else if (result.UserTypeID === roles.maintenar) {
					setSubmitting(false);
					router.replace("/Maintanacehome");
				} else if (result.UserTypeID === roles.manager) {
					setSubmitting(false);
					router.replace("/ManagerHome");
				}
			}, 1500);
		} catch (error) {
			setSubmitting(false);
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: error.message,
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});
		}
	};

	useEffect(() => {
		if (isLogged) {
			if (user.type === roles.operator) {
				router.replace("/home");
			} else if (user.type === roles.maintenar) {
				router.replace("/Maintanacehome");
			} else if (user.type === roles.manager) {
				router.replace("/ManagerHome");
			}
		}
	}, []);

	return (
		<SafeAreaView className="bg-white h-full">
			<ScrollView>
				<LogoBar />
				<View className="h-full px-4 my-6 mt-20">
					<View>
						<Text className="text-dark text-center text-2xl font-tbold mb-10">
							تسجيل الدخول
						</Text>
					</View>
					<FormField
						inputStyle={"p-4"}
						title="اسم المستخدم"
						value={form.username}
						handleChangeText={(e) => setForm({ ...form, username: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
						icon={icons.User}
						placeholder="اسم المستخدم"
						inputIconUser={form.username && icons.deleteIcon}
						handlePress={(e) =>
							setForm({ ...form, username: "", password: "" })
						}
					/>

					<FormField
						inputStyle={"p-4"}
						title="كلمة المرور"
						value={form.password}
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles="mt-7"
						icon={icons.lock}
						placeholder="ادخل كلمة المرور"
					/>

					<MainButton
						title="تسجيل الدخول"
						handlePress={submit}
						containerStyles="mt-14"
						isLoading={isSubmitting}
						icon={icons.Signin}
					/>
				</View>
				<Toast />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Welcome;
