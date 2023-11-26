/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
																																																																																	   
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";

// Custom components
import StripAction from "components/strip/StripAction";
import StripPromt from "components/strip/StripPromt";
import { useState } from "react";

const bearerToken = process.env.YOUR_BEARER_TOKEN;

export default function EditorHome() {
	const [isFetching, setIsFetching] = useState(false);
	const [prompts, setPrompts] = useState<string[]>([]);
	const [images, setImage] = useState<Blob[]>([]);
	const [configurations, setConfigurations] = useState({
		showCaption: true,
		imageperrow: 3,
	});

	const query = async (prompt: string) => {
		try {
			const response = await fetch(
				"https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
				{
					headers: {
						"Accept": "image/png",
						"Authorization": "Bearer ${bearerToken}",
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify({ inputs: prompt }),
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.blob();
		} catch (error) {
			console.error("Error fetching image:", error);
			return null;
		}
	};

	const handleContentChange = (e: React.SyntheticEvent) => { };

	const handleChangePrompts = (newPrompts: string[]) => {
		setPrompts(newPrompts);
	};

	const handleShootPrompts = async () => {
		setIsFetching(true);
		const imagePromises = prompts.map(prompt =>
			query(prompt).catch(error => {
				console.error(`Error with prompt "${prompt}":`, error);
				return null;
			})
		);

		const fetchedImages = await Promise.all(imagePromises);
		const validImages = fetchedImages.filter(blob => blob !== null) as Blob[];

		setImage(validImages);
		setIsFetching(false);
	};

	// render fetched images
	const renderImages = images.map((blob, index) => (
		<img key={index} src={URL.createObjectURL(blob)} alt={`Generated image ${index}`} />
	));

	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
				{/* <EditorArea handleContentChange={handleContentChange} /> */}
			</SimpleGrid>
			<Box display={isFetching ? "none" : "block"}>
				<Grid templateColumns="repeat(5, 1fr)" gap="20px" mb="20px">
					<GridItem colSpan={{ base: 5, lg: 4 }} minHeight="100px">
						<StripPromt handleChangePrompts={handleChangePrompts} />
					</GridItem>
					<GridItem colSpan={{ base: 5, lg: 1 }} minHeight="100px">
						<StripAction
							count={prompts.length}
							submitAction={handleShootPrompts}
							setConfigurations={setConfigurations}
						/>
					</GridItem>
				</Grid>
			</Box>
		</Box>
	);
}
