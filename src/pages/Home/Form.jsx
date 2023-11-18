import React, { useRef } from "react"
import {
	FormControl,
	FormErrorMessage,
	Textarea,
	Stack,
	Link
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { defaultTextToSpeetch, linkVoiceOverArtistsMyAffirmation, linkAffirmationTemplates } from "../../data"
import { EmailIcon, LinkIcon, InputAi, SelectAi, LabelAi, TextAi, ButtonAi } from "../../components"
import { RepeatIcon } from '@chakra-ui/icons'
import "./form.css"
  
export const FormInput = ({ payment, generateAudio, voices, audioUrl, setAudioUrl }) => {
  	const audioref = useRef()

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
		const body = {
			...values,
			voice_settings: {
				stability: 0.5,
				similarity_boost: 0.5
			}
		}

		if (audioUrl) {
			await payment(body)
		} else {
			await generateAudio(body, audioref)
		}
		actions.setSubmitting(false)
	}

	return (
		<Formik
			initialValues={{ email: "", text: defaultTextToSpeetch, voice_id: "" }}
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
							<InputAi
								field={field}
								form={form}
								name="email"
								labelText="Your email"
								placeholder="ex. johndoe@gmail.com"
								icon={<EmailIcon />}
							/>
						)}
					</Field>
					<Field name="voice_id">
						{({ field, form }) => (
							<SelectAi
								field={field}
								form={form}
								name="voice_id"
								labelText="Voice (30 languages)"
								placeholder="Select voice..."
								icon={<LinkIcon />}
								link={linkVoiceOverArtistsMyAffirmation}
								linkName="Voice Over Examples"
							>
								{voices.map((voice) => (
									<option key={voice.voice_id} value={voice.voice_id}>
										{voice.name} -
										{voice.labels.description && ` ${voice.labels.description}`}
										{voice.labels["use case" || "use_case"] && `, ${voice.labels["use case" || "use_case"]}`}
									</option>
								))}
							</SelectAi>
						)}
					</Field>
					<Field name="text">
						{({ field, form }) => (
							<FormControl isInvalid={form.errors.text && form.touched.text} mt={4}>
								<Stack
									direction={{ base: 'row', sm: 'row' }}
									align={'start'}
									justify={'space-between'}
								>
									<LabelAi labelText={"Text to Speech"} />
									<Stack
										direction={{ base: 'row', sm: 'row' }}
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
									minH={"220px"}
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
								<TextAi
									style={{ mt: "8px", lineHeight: "21px", fontSize: "14px" }}
									text="2500 characters left"
								/>
								<FormErrorMessage className="form-error" color={"rgba(208, 58, 103, 1)"}>{form.errors.text}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					{audioUrl && (
						<Stack>
							<TextAi
								style={{ pt: "40px" }}
								text="Listen to a small video recording. Full voice over track is unlocked available just for $39 after the payment."
							/>
							<TextAi
								style={{ pt: "40px", fontWeight: "bold" }}
								text="Demo of the Voice Over :"
							/>
							<audio
								ref={audioref}
								controls
							>
								<source src={audioUrl} type="audio/mpeg" />
							</audio>
							<TextAi
								style={{ pt: "20px" }}
								text="Get motivation, reach your goals by listening your affirmation daily"
							/>
						</Stack>
					)}
					<Stack direction='row' justifyContent={"space-between"} pt={"40px"}>
						<ButtonAi
							text={"Back to Home"}
							other={{
								type: "button"
							}}
						/>
						{audioUrl && (
							<ButtonAi
								text={<RepeatIcon boxSize={6} color={"rgba(105, 101, 89, 1)"} />}
								other={{
									type: "button"
								}}
								handler={() => {
									props.resetForm()
									setAudioUrl(null)
									localStorage.clear()
								}}
							/>
						)}
						<ButtonAi
							text={ audioUrl ? "Buy full track - $39" : "Generate" }
							style={{
								color: "rgba(255, 255, 255, 1)",
								bg: "rgba(87, 152, 129, 1)",
								_hover: {
									backgroundColor: "rgba(87, 152, 129, 1)",
									opacity: "0.5"
								}
							}}
							other={{
								isLoading: props.isSubmitting,
								type: "submit"
							}}
						/>
					</Stack>
					<Stack>
						<TextAi
							style={{ pt: "25px", textAlign: "center", fontSize: "15px" }}
							text="Upload affirmation to your phone and listen"
						/>
					</Stack>
				</Form>
			)}
		</Formik>
	)
}
