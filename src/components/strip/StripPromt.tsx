// Chakra imports
import {
	Flex,
	Stat,
	StatLabel,
	StatNumber,
	useColorModeValue,
	Icon,
	Textarea,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import IconBox from "components/icons/IconBox";
import React from "react";
import { MdEditDocument } from "react-icons/md";

export default function Default(props: {
	handleChangePrompts: (newPrompts: string[]) => void;
}) {
	const { handleChangePrompts } = props;

	const textColor = useColorModeValue("secondaryGray.900", "white");
	const textColorSecondary = "secondaryGray.600";
	// Chakra Color Mode
	const brandColor = useColorModeValue("brand.500", "white");
	const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

	const updatePrompts = (e: React.SyntheticEvent) => {
		const promptText = (e.target as HTMLTextAreaElement).value;
		const newPrompts = promptText
			.split("\n")
			.filter((p) => p !== "")
			.slice(0, 10);
		handleChangePrompts(newPrompts);
	};

	return (
		<Card py="15px" h="100%">
			<Flex
				my="auto"
				h="100%"
				align={{ base: "center", xl: "start" }}
				justify={{ base: "center", xl: "center" }}
			>
				<IconBox
					w="56px"
					h="56px"
					bg={boxBg}
					icon={
						<Icon w="32px" h="32px" as={MdEditDocument} color={brandColor} />
					}
					display={{ base: "none", xl: "flex" }}
				/>

				<Stat my="auto" ms="18px">
					<StatLabel
						lineHeight="100%"
						color={textColorSecondary}
						fontSize={{
							base: "md",
						}}
					>
						Promts
					</StatLabel>
					<StatNumber
						color={textColor}
						fontSize={{
							base: "xl",
						}}
					>
						<Textarea
							my={2}
							placeholder="Add all promts seperated by a newline"
							minHeight="250px"
							onChange={updatePrompts}
						/>
					</StatNumber>
				</Stat>
			</Flex>
		</Card>
	);
}