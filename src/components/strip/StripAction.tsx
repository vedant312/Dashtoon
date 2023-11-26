// Chakra imports
import {
	Flex,
	Stat,
	StatLabel,
	StatNumber,
	useColorModeValue,
	Icon,
	Button,
	Select,
	Switch,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import IconBox from "components/icons/IconBox";
import { MdClosedCaption, MdFileCopy, MdGridView } from "react-icons/md";

export default function Default(props: {
	count: number;
	submitAction: () => void;
	setConfigurations: React.Dispatch<
		React.SetStateAction<{
			showCaption: boolean;
			imageperrow: number;
		}>
	>;
}) {
	const { count, submitAction, setConfigurations } = props;
	const textColor = useColorModeValue("secondaryGray.900", "white");
	const textColorSecondary = "secondaryGray.600";
	const brandColor = useColorModeValue("brand.500", "white");
	const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

	return (
		<Card py="15px" h="100%">
			<Flex
				my="auto"
				align={{ base: "start", xl: "start" }}
				justify={{ base: "start", xl: "start" }}
			>
				<IconBox
					w="56px"
					h="56px"
					bg={boxBg}
					icon={<Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />}
				/>
				<Stat my="2" ms={"18px"}>
					<StatLabel
						lineHeight="100%"
						color={textColorSecondary}
						fontSize={{
							base: "sm",
						}}
					>
						Prompts Count
					</StatLabel>
					<StatNumber
						id="word-count"
						color={textColor}
						fontSize={{
							base: "2xl",
						}}
					>
						{count}/10
					</StatNumber>
				</Stat>
			</Flex>
			<Flex
				my="auto"
				align={{ base: "start", xl: "start" }}
				justify={{ base: "start", xl: "start" }}
				display={{ base: "none", xl: "flex" }}
			>
				<IconBox
					w="56px"
					h="56px"
					bg={boxBg}
					icon={<Icon w="32px" h="32px" as={MdGridView} color={brandColor} />}
				/>
				<Stat my="2" ms={"18px"}>
					<StatLabel
						lineHeight="100%"
						color={textColorSecondary}
						fontSize={{
							base: "sm",
						}}
					>
						Images per row
					</StatLabel>
					<StatNumber
						id="word-count"
						color={textColor}
						fontSize={{
							base: "2xl",
						}}
					>
						<Select
							placeholder="Select option"
							size="sm"
							defaultValue={3}
							onChange={(e) => {
								setConfigurations((prev) => ({
									...prev,
									imageperrow: parseInt(e.target.value),
								}));
							}}
						>
							<option value={1}>1 per row</option>
							<option value={2}>2 per row</option>
							<option value={3}>3 per row</option>
							<option value={4}>4 per row</option>
							<option value={5}>5 per row</option>
						</Select>
					</StatNumber>
				</Stat>
			</Flex>
			<Flex
				my="auto"
				align={{ base: "start", xl: "start" }}
				justify={{ base: "start", xl: "start" }}
			>
				<IconBox
					w="56px"
					h="56px"
					bg={boxBg}
					icon={
						<Icon w="32px" h="32px" as={MdClosedCaption} color={brandColor} />
					}
				/>
				<Stat my="2" ms={"18px"}>
					<StatLabel
						lineHeight="100%"
						color={textColorSecondary}
						fontSize={{
							base: "sm",
						}}
					>
						Show Captions on Render
					</StatLabel>
					<StatNumber
						id="word-count"
						color={textColor}
						fontSize={{
							base: "2xl",
						}}
					>
						<Switch
							size="md"
							defaultChecked={true}
							onChange={(e) => {
								setConfigurations((prev) => ({
									...prev,
									showCaption: e.target.checked,
								}));
							}}
						/>
					</StatNumber>
				</Stat>
			</Flex>
			<Button
				my="auto"
				onClick={submitAction}
				colorScheme="brand"
				variant="solid"
				size="sm"
				_hover={{
					color: "brand.500",
					bg: "white",
				}}
			>
				Generate Comic Strip
			</Button>
		</Card>
	);
}