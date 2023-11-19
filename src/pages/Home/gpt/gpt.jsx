import React from "react";
import { Field, Form, Formik } from "formik"
import { SelectAi, InputAi, ButtonAi } from "../../../components"
import { generateText } from "../../../services/openai"
import { typesAffirmation, kindsAffirmation } from "../../../data"
import { Stack } from "@chakra-ui/react"

export const FormGpt = ({ closeModal, setText }) => {
    const validateValues = (key, value) => {
		const errors = {}
		if (!value) {
			errors[key] = "Required"
		}
		return errors
	}

    const onSubmit = async (values, actions) => {
        const { name_surname, type_affirmation, kind_affirmation } = values
        const text = `My name is ${name_surname}, I want ${type_affirmation} motivation about ${kind_affirmation}.`
        const data = await generateText({ text })
        if (!data.success) {
            return false
        }
        actions.setSubmitting(false)
        setText("text", data.content)
        closeModal()
    }
    return (
        <Formik
			initialValues={{ name_surname: "", type_affirmation: "", kind_affirmation: "" }}
			validate={(values) => {
				const errorsValidateNameSurname = validateValues("name_surname", values.name_surname)
				const errorsValidateTypeAff = validateValues("type_affirmation", values.type_affirmation)
				const errorsvalidateKindAff = validateValues("kind_affirmation", values.kind_affirmation)
				return {
					...errorsValidateNameSurname,
					...errorsValidateTypeAff,
					...errorsvalidateKindAff,
				}
			}}
			onSubmit={onSubmit}
		>
            {(props) => (
                <Form>
                    <Field name="name_surname">
                        {({ field, form }) => (
                            <InputAi
                                field={field}
                                form={form}
                                name="name_surname"
                                labelText="Your name and surname"
                                placeholder="Petr Ivanov"
                            />
                        )}
                    </Field>
                    <Field name="type_affirmation">
                        {({ field, form }) => (
                            <SelectAi
                                field={field}
                                form={form}
                                name="type_affirmation"
                                labelText="Type of motivation:"
                                placeholder="Select type..."
                            >
                                {typesAffirmation.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </SelectAi>
                        )}
                    </Field>
                    <Field name="kind_affirmation">
                        {({ field, form }) => (
                            <SelectAi
                                field={field}
                                form={form}
                                name="kind_affirmation"
                                labelText="What you want from the affirmation:"
                                placeholder="Select..."
                            >
                            {kindsAffirmation.map((kind, index) => (
                                <option key={index} value={kind}>
                                    {kind}
                                </option>
                            ))}
                        </SelectAi>
                        )}
                    </Field>
                    <Stack direction='row' justifyContent={"space-between"} pt={"24px"}>
                        <ButtonAi
                            text={ "Generate Text" }
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
                        <ButtonAi
                            text={ "Close" }
                            other={{
                                type: "button"
                            }}
                            handler={() => {
                                props.resetForm()
                                closeModal()
                            }}
                        />
                    </Stack>
                </Form>
            )}
        </Formik>
    )
}