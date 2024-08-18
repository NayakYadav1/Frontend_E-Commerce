import { InputField, SelectField, SubmitBtn } from "@/components"
import http from "@/http"
import { handleValidationError } from "@/lib"
import { useFormik } from "formik"
import { Col, Container, Row, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'

export const Create = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            status: true,
        }, 
        validationSchema: Yup.object({
            name: Yup.string().required(),
            status: Yup.bool().required(),
        }),
        onSubmit: (data, { setSubmitting }) => {
            http.post('cms/categories', data)
                .then(() => navigate('/categories'))
                .catch(({ response }) => handleValidationError(formik, response.data))
                .finally(() => setSubmitting(false))
        }
    })

    return <Container className="bg-white py-3 my-3 rounded-2 shadow-sm">
        <Row>
            <Col>
                <h1>Add Category</h1>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit}>
                    <InputField formik={formik} name="name" label="Name" />

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