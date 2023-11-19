import React, { useEffect } from "react"
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
    Stack,
    RadioGroup,
    Radio
} from "@chakra-ui/react"
import { TextAi } from "../../components"

const styleFormText = {
    fontFamily: "Poppins",
    fontSize: "16px",
    color: "rgba(105, 101, 89, 1)",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0em",
    textAlign: "left"
}

export const Voices = ({ values, setVoice }) => {
    const [voiceId, setVoiceId] = React.useState(values[0].voice_id)

    useEffect(() => {
        setVoice("voice_id", voiceId)
    }, [setVoice, voiceId])

    const prepareValue = (value) => {
        const description = [
            value.labels.description,
            value.labels["use case"] || value.labels["use_case"] || value.labels["usecase"]
        ].filter( item => item).join(", ")
        return `${value.name} - ${description}`
    }

	return (
		<Accordion allowToggle pt={"10px"}>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box as="span" flex="1" {...styleFormText}>
                            Voice (30 languages)
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4} overflowY={"scroll"} maxHeight={"400px"}>
                    <RadioGroup onChange={setVoiceId} value={voiceId}>
                        {values.map( (value, index) => (
                            <Stack key={index}>
                                <TextAi
                                    style={{ pt: "20px" }}
                                    text={prepareValue(value)}
                                />
                                <Stack direction={{ base: 'row', sm: 'row' }}>
                                    <audio controls>
                                        <source src={value.preview_url} type="audio/mpeg" />
                                    </audio>
                                    <Radio value={value.voice_id}  colorScheme='green' borderColor={"rgba(105, 101, 89, 1)"} />
                                </Stack>
                            </Stack>
                        ))}
                    </RadioGroup>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	)
}
