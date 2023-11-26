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
import { Box, Grid, GridItem, SimpleGrid, useToast } from "@chakra-ui/react";
import ImageCard from "components/card/ImageCard";

// Custom components
import StripAction from "components/strip/StripAction";
import StripPromt from "components/strip/StripPromt";
import { useState } from "react";

export default function EditorHome() {
	const [isFetching, setIsFetching] = useState(false);
	const [prompts, setPrompts] = useState<string[]>([]);
	const [images, setImages] = useState<Blob[]>([]);
	const [configurations, setConfigurations] = useState({
		showCaption: true,
		imageperrow: 3,
	});

	const handleChangePrompts = (newPrompts: string[]) => {
		setPrompts(newPrompts);
	};

	const toast = useToast();

	const query = async (prompt: string, index: number) => {
		try {
			const response = await fetch(
				"https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
				{
					headers: {
						Accept: "image/png",
						Authorization: "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify({ inputs: prompt }),
				},
			);
			if (!response.ok) {
				toast({
					title: "Error fetching image.",
					description: `HTTP error! status: ${response.status}`,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				setIsFetching(false);
				setImages([]);
				return null;
			}
			const imgblob = await response.blob();
			setImages((prev) => {
				prev[index] = imgblob;
				return prev;
			});
			return true;
		} catch (error) {
			toast({
				title: "An error occurred.",
				description: "There was an error fetching the image.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			setIsFetching(false);
			setImages([]);
			console.error("Error fetching image:", error, prompt);
			return false;
		}
	};

	const handleShootPrompts = async () => {
		setIsFetching(true);
		setImages(() => {
			const newImages = [];
			while (newImages.length < prompts.length) {
				newImages.push(null);
			}
			return newImages;
		});


		const imagePromises = prompts.map((prompt, index) => query(prompt, index));
		await Promise.all(imagePromises);


		setIsFetching(false);
	};

	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<SimpleGrid
				columns={{ base: 1, md: 2, xl: configurations.imageperrow }}
				gap="20px"
				mb="20px"
			>
				{images.map((blob, index) => (
					<ImageCard
						key={index}
						blob={blob}
						prompt={prompts[index]}
						showCaption={configurations.showCaption}
						imageperrow={configurations.imageperrow}
					/>
				))}
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