import { InputField, SelectField, SubmitBtn } from "@/components"
import http from "@/http"
import { handleValidationError } from "@/lib"
import { useFormik } from "formik"
import { Col, Container, Row, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import YupPassword from "yup-password"

YupPassword(Yup)

export const Create = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            address: '',
            status: true,
        }, 
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(6)
                .minLowercase(1).minUppercase(1)
                .minNumbers(1).minSymbols(1),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], 'Password is not confirmed'),
            phone: Yup.string().required().max(30),
            address: Yup.string().required(),
            status: Yup.bool().required(),
        }),
        onSubmit: (data, { setSubmitting }) => {
            http.post('/cms/customers', data)
                .then(() => navigate('/customers'))
                .catch(({ response }) => handleValidationError(formik, response.data))
                .finally(() => setSubmitting(false))
        }
    })

    return <Container className="bg-white py-3 my-3 rounded-2 shadow-sm">
        <Row>
            <Col>
                <h1>Add Customer</h1>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit}>
                    <InputField formik={formik} name="name" label="Name" />
                    <InputField formik={formik} name="email" label="Email" />
                    <InputField formik={formik} name="password" label="Password" type="password" />
                    <InputField formik={formik} name="confirmPassword" label="Confirm Password" type="password" />
                    <InputField formik={formik} name="phone" label="Phone" />
                    <InputField formik={formik} name="address" label="Address" as="textarea" />

                    <SelectField formik={formik} 
                        name="status" 
                        label="Status" 
                        options={{ 'Active': true, 'Inactive': false}} 
                        onChange={({ target }) => formik.setFieldValue('status', target.value == 'true')}/>

                    <SubmitBtn loading={formik.isSubmitting} />
                </Form>
            </Col>
        </Row>
    </Container>
}