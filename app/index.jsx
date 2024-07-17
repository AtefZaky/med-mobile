import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import Toast from "react-native-toast-message";
import { icons } from "../constants";
import { MainButton, FormField, LogoBar, Header } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { login } from "../utils/api";

const Welcome = () => {
  const { setUser, setIsLogged, isLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.password === "") {
      // Toast.show({
      //   type: "error",
      //   text1: "خطأ",
      //   text2: "من فضلك ادخل البيانات المطلوبه",
      //   autoHide: true,
      //   visibilityTime: 3000,
      //   text1Style: {
      //     textAlign: 'right',
      //   },
      //   text2Style: {
      //     textAlign: 'right',
      //   },
      // })
    }

    setSubmitting(true);

    try {
      const result = await login(form.username, form.password);
    //   const result = await getCurrentUser();
      setUser({username: result.username, lastActive: result.lastActive, type: result.UserTypeID, DepartmentID: result.UserDepartmentID });
      setIsLogged(true);
      // Toast.show({
      //   type: "success",
      //   text1: "عملية ناجحه",
      //   text2: "تم تسجيل الدخول بنجاح",
      //   autoHide: true,
      //   visibilityTime: 3000,
      //   text1Style: {
      //     textAlign: 'right',
      //   },
      //   text2Style: {
      //     textAlign: 'right',
      //   },
      // })
      router.replace("/home");
    } catch (error) {
      // Toast.show({
      //   type: "error",
      //   text1: "خطأ",
      //   text2: error.message,
      //   autoHide: true,
      //   visibilityTime: 3000,
      //   text1Style: {
      //     textAlign: 'right',
      //   },
      //   text2Style: {
      //     textAlign: 'right',
      //   },
      // })
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isLogged) {
      router.replace("/home");
    }
  }, [isLogged, router]);
  


  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <LogoBar/>
        <View
          className="h-full px-4 my-6 mt-20"
          style={{
            minHeight: Dimensions.get("window").height,
          }}
        >
          {/* <Image
            // source={.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          /> */}
          <View>
            <Text className="text-dark text-center text-2xl font-tbold mb-10">
              تسجيل الدخول
            </Text>
          </View>
          <FormField
            title="اسم المستخدم"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            icon={icons.User}
            placeholder='اسم المستخدم'
          />

          <FormField
            title="كلمة المرور"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            icon={icons.lock}
            placeholder='ادخل كلمة المرور'
          />

          <MainButton
            title="تسجيل الدخول"
            handlePress={submit}
            containerStyles=" mt-14"
            isLoading={isSubmitting}
            icon={icons.Signin}
          />
        </View>
        <Toast/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;

