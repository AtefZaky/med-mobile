import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import primary from "../constants";
export default function DropDown({ items, setOption, setItems, value }) {
	const [open, setOpen] = useState(false);

	// const [value, setValue] = useState(null);

	// const [items, setItems] = useState([
	// 	{ label: "Apple", value: "apple" },
	// 	{ label: "Banana", value: "banana" },
	// ]);

	return (
		<DropDownPicker
			autoScroll={true}
			style={{ borderColor: "#1C5B7D" }}
			open={open}
			value={value}
			items={items}
			setOpen={setOpen}
			setValue={(value) => {
				setOption(value);
			}}
			setItems={setItems}
		/>
	);
}
