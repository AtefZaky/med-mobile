import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

const Notify = () => {
	const [messages, setMessages] = useState([
		"تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية  تنبيةتنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية  تنبيةتنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية  تنبيةتنبية تنبية تنبية تنبية تنبية",
		"تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية  تنبيةتنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية  تنبيةتنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية  تنبيةتنبية تنبية تنبية تنبية تنبية",
		"تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية  تنبيةتنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية  تنبيةتنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية  تنبيةتنبية تنبية تنبية تنبية تنبية",
	]);

	//   useEffect(() => {
	//     const fetchMessages = async () => {
	//       try {
	//         const response = await fetch('https://api.example.com/messages');
	//         const data = await response.json();
	//         setMessages(data);
	//       } catch (error) {
	//         console.error('Error fetching messages:', error);
	//       }
	//     };

	//     fetchMessages();
	//   }, []);

	return (
		<View style={styles.notification}>
			<View style={styles.section}>
				<ScrollView style={styles.notificationContainer}>
					{messages.map((msg, index) => (
						<View
							key={index}
							style={[
								styles.message,
								msg.type === "notification"
									? styles.notificationContainer.answer
									: styles.notificationContainer.userChat,
							]}>
							<Text style={styles.messageText}>{msg.text}</Text>
						</View>
					))}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	// ... (existing styles)
});

export default Notify;
