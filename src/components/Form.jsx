import React from "react"
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Button,
	Select,
	Textarea,
	Text,
	Stack,
	InputRightElement,
	InputGroup,
	Link
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { EmailIcon, LinkIcon } from "../components"
import "./form.css"

const linkVoiceOverArtistsMyAffirmation = "https://lemondigital.notion.site/Voice-Over-Artists-MyAffirmation-ai-acb83e4627cf48749a2ceb9ad72af02c?pvs=4"
const linkAffirmationTemplates = "https://lemondigital.notion.site/Affirmation-text-Templates-0a2edbbb9f9d480b881d6923dee4f42f?pvs=4"
  
export const FormInput = ({ handler, voices }) => {
  // const [stabilityValue, setStabilityValue] = useState(50)
  // const [similarityBoostValue, setSimilarityBoostValue] = useState(50)

	  const validateEmail = (email) => {
		const errors = {}
		if (!email) {
			errors.email = "Required"
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
			errors.email = "Invalid email address"
		}
		return errors
	}
	const validateText = (text) => {
		const errors = {}
		if (!text) {
			errors.text = "Required"
		} else if (text.length > 2500) {
			errors.text = "Exceeded 2500 character limit"
		}
		return errors
	}
	const validateVoice = (voice_id) => {
		const errors = {}
		if (!voice_id) {
			errors.voice_id = "Required"
		}
		return errors
	}

	const onSubmit = async (values, actions) => {
		console.log(values)
    const body = {
      ...values,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5
      }
    }
		await handler(body)
		actions.setSubmitting(false)
	}

	return (
		<Formik
			initialValues={{ email: "", text: "", voice_id: "" }}
			validate={(values) => {
				const errorsValidateEmail = validateEmail(values.email)
				const errorsValidateText = validateText(values.text)
				const errorsvalidateVoice = validateVoice(values.voice_id)
				return {
					...errorsValidateEmail,
					...errorsValidateText,
					...errorsvalidateVoice,
				}
			}}
			onSubmit={onSubmit}
		>
			{(props) => (
				<Form>
					<Field name="email">
						{({ field, form }) => (
							<FormControl isInvalid={form.errors.email && form.touched.email} mt={4}>
								<FormLabel className="form-label">Your email</FormLabel>
								<InputGroup>
									<Input
										{...field}
										placeholder="ex. johndoe@gmail.com"
										p={"12px"}
										h={"48px"}
										className="form-input"
										bg={"rgba(255, 255, 255, 1)"}
										borderWidth={"1px"}
										borderColor={"rgba(171, 168, 164, 1)"}
										focusBorderColor='rgba(171, 168, 164, 1)'
										errorBorderColor="rgba(208, 58, 103, 1)"
										fontSize={"16px"}
										_focusVisible={{
											outline: "none"
										}}
										_placeholder={{
											color: "rgba(105, 101, 89, 0.6)"
										}}
									/>
									<InputRightElement h={"100%"}>
										<EmailIcon />
									</InputRightElement>
								</InputGroup>
								<FormErrorMessage className="form-error" color={"rgba(208, 58, 103, 1)"}>{form.errors.email}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Field name="voice_id">
						{({ field, form }) => (
							<FormControl
								isInvalid={form.errors.voice_id && form.touched.voice_id}
								mt={4}
							>
								<Stack
									direction={{ base: 'column', sm: 'row' }}
									align={'start'}
									justify={'space-between'}>
									<FormLabel className="form-label">Voice</FormLabel>
									<Stack
										direction={{ base: 'column', sm: 'row' }}
										align={'center'}
									>
										<Link
											color={'rgba(52, 123, 97, 1)'}
											fontSize={"16px"}
											fontFamily={"Poppins"}
											lineHeight={"24px"}
											fontWeight={400}
											href={linkVoiceOverArtistsMyAffirmation}
											isExternal
										>Voice Over Examples</Link>
										<LinkIcon />
									</Stack>
								</Stack>
								<Select
									{...field}
									fontSize={"16px"}
									h={"48px"}
									fontFamily={"Poppins"}
									placeholder="Select voice..."
									bg={"rgba(255, 255, 255, 1)"}
									border={"1px solid rgba(171, 168, 164, 1)"}
									focusBorderColor='rgba(171, 168, 164, 1)'
									errorBorderColor="rgba(208, 58, 103, 1)"
									_focusVisible={{
										outline: "none",
								   }}
									_placeholder={{
										color: "rgba(105, 101, 89, 0.6)"
									}}
								>
									{voices.map((voice) => (
										<option key={voice.voice_id} value={voice.voice_id}>
											{voice.name} -
											{voice.labels.description && ` ${voice.labels.description}`}
											{voice.labels["use case" || "use_case"] && `, ${voice.labels["use case" || "use_case"]}`}
										</option>
									))}
								</Select>
								<FormErrorMessage className="form-error" color={"rgba(208, 58, 103, 1)"}>{form.errors.voice_id}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					{/*<FormControl mt={4}>
						<FormLabel >Stability</FormLabel>
						<SliderThumbWithTooltip setSettingValue={setStabilityValue} settingValue={stabilityValue} />
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Similarity Boost</FormLabel>
						<SliderThumbWithTooltip setSettingValue={setSimilarityBoostValue} settingValue={similarityBoostValue} />
					</FormControl>*/}
					<Field name="text">
						{({ field, form }) => (
							<FormControl isInvalid={form.errors.text && form.touched.text} mt={4}>
								<Stack
									direction={{ base: 'column', sm: 'row' }}
									align={'start'}
									justify={'space-between'}>
									<FormLabel className="form-label">Text to Speech</FormLabel>
									<Stack
										direction={{ base: 'column', sm: 'row' }}
										align={'center'}
									>
										<Link
											color={'rgba(52, 123, 97, 1)'}
											fontSize={"16px"}
											fontFamily={"Poppins"}
											lineHeight={"24px"}
											fontWeight={400}
											href={linkAffirmationTemplates}
											isExternal
										>Affirmation Text Templates</Link>
										<LinkIcon />
									</Stack>
								</Stack>
								<Textarea
									{...field}
									className="textarea"
									fontSize={"16px"}
									fontFamily={"Poppins"}
									minH={"180px"}
									p={"12px"}
									placeholder="Type your text to generate an affirmation..."
									bg={"rgba(255, 255, 255, 1)"}
									border={"1px solid rgba(171, 168, 164, 1)"}
									focusBorderColor='rgba(171, 168, 164, 1)'
									errorBorderColor="rgba(208, 58, 103, 1)"
									_focusVisible={{
										outline: "none",
								   }}
									_placeholder={{
										color: "rgba(105, 101, 89, 0.6)"
									}}
								/>
								<Text className="textarea-limit">2500 characters left</Text>
								<FormErrorMessage className="form-error" color={"rgba(208, 58, 103, 1)"}>{form.errors.text}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Stack direction='row' justifyContent={"space-between"} pt={"55px"}>
						<Button
							variant='solid'
							fontWeight={400}
							fontFamily={"Poppins"}
							fontSize={"16px"}
							lineHeight={"24px"}
							borderRadius={"8px"}
							h={"48px"}
							border={"1px solid rgba(0, 0, 0, 0.15)"}
							color={"rgba(105, 101, 89, 1)"}
							bg={"none"}
							p={"12px 24px 12px 24px"}
						>
							Back to Home
						</Button>
						<Button
							variant={"solid"}
							fontWeight={400}
							fontFamily={"Poppins"}
							fontSize={"16px"}
							lineHeight={"24px"}
							borderRadius={"8px"}
							color={"rgba(255, 255, 255, 1)"}
							h={"48px"}
							bg={"rgba(87, 152, 129, 1)"}
							p={"12px 24px 12px 24px"}
							_hover={{
								backgroundColor: "rgba(87, 152, 129, 1)",
								opacity: "0.5"
							}}
							isLoading={props.isSubmitting}
							type="submit"
						>
							Order - $39
						</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	)
}
