import { Redirect, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    if (isLogged) {
      router.replace("/home");
    }
  }, [isLogged, router]);

  return (
    <>
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="assetsOperations"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="dailyPercentage"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="dailyOperationsInfo"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="reportFailure"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;