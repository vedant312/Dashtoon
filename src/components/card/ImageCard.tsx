import { Image, Spinner, Text } from "@chakra-ui/react";
import Card from "./Card";

interface ImageCardProps {
	blob: Blob;
	prompt: string;
	showCaption: boolean;
	imageperrow: number;
}

export default function ImageCard(props: ImageCardProps) {
	const { blob, prompt, showCaption, imageperrow } = props;
	return (
		<Card w="100%">
			<Text
				fontSize={{ base: "md", xl: getTextSize(imageperrow) }}
				hidden={!showCaption}
			>
				{prompt}
			</Text>
			{blob != null ? (
				<Image
					mt="2"
					objectFit="cover"
					src={URL.createObjectURL(blob)}
					alt="Fetched Image"
				/>
			) : (
				<Spinner size="lg" alignSelf="center" />
			)}
		</Card>
	);
}

function getTextSize(imageperrow: number) {
	let textSize = "sm";
	switch (imageperrow) {
		case 1:
			textSize = "5xl";
			break;
		case 2:
			textSize = "2xl";
			break;
		case 3:
			textSize = "lg";
			break;
		case 4:
			textSize = "md";
			break;
		default:
			textSize = "sm";
			break;
	}
	return textSize;
}