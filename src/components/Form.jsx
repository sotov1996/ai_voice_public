import React, { useState } from "react"
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Button,
	Select,
	Textarea
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { SliderThumbWithTooltip } from "./"

export const FormInput = ({ handler, voices }) => {
  const [stabilityValue, setStabilityValue] = useState(50)
  const [similarityBoostValue, setSimilarityBoostValue] = useState(50)

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
        stability: stabilityValue/100,
        similarity_boost: similarityBoostValue/100
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
				<Form
					style={{ maxWidth: "600px", margin: "auto", minHeight: "calc(100vh - 168px)" }}
				>
					<Field name="email">
						{({ field, form }) => (
							<FormControl isInvalid={form.errors.email && form.touched.email} mt={4}>
								<FormLabel>Email</FormLabel>
								<Input {...field} placeholder="Email" />
								<FormErrorMessage>{form.errors.email}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Field name="voice_id">
						{({ field, form }) => (
							<FormControl
								isInvalid={form.errors.voice_id && form.touched.voice_id}
								mt={4}
							>
								<FormLabel>Voices</FormLabel>
								<Select {...field} placeholder="Select Voices">
									{voices.map((voice) => (
										<option key={voice.voice_id} value={voice.voice_id}>
											{voice.name}
										</option>
									))}
								</Select>
								<FormErrorMessage>{form.errors.voice_id}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
          <FormControl mt={4}>
            <FormLabel >Stability</FormLabel>
						<SliderThumbWithTooltip setSettingValue={setStabilityValue} settingValue={stabilityValue} />
					</FormControl>
          <FormControl mt={4}>
            <FormLabel>Similarity Boost</FormLabel>
						<SliderThumbWithTooltip setSettingValue={setSimilarityBoostValue} settingValue={similarityBoostValue} />
					</FormControl>
					<Field name="text">
						{({ field, form }) => (
							<FormControl isInvalid={form.errors.text && form.touched.text} mt={4}>
								<FormLabel>Text to Speech</FormLabel>
								<Textarea {...field} size={"lg"} placeholder="Text" />
								<FormErrorMessage>{form.errors.text}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Button
						mt={4}
						mb={4}
						bg="rgba(49, 43, 65, 0.5)"
						color="white"
						isLoading={props.isSubmitting}
						w="100%"
						type="submit"
					>
						Generate
					</Button>
				</Form>
			)}
		</Formik>
	)
}
