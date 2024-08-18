import { InputField, Loading, SelectField, SubmitBtn } from "@/components"
import http from "@/http"
import { handleValidationError } from "@/lib"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import * as Yup from 'yup'

export const Edit = () => {
    const [category, setCategory] = useState({})
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            status: true,
        }, 
        validationSchema: Yup.object({
            name: Yup.string().required(),
            status: Yup.boolean().required(),
        }),
        onSubmit: (data, { setSubmitting }) => {
            http.patch(`cms/categories/${params.id}`, data)
                .then(() => navigate('/categories'))
                .catch(({ response }) => handleValidationError(formik, response.data))
                .finally(() => setSubmitting(false))
        }
    })

    useEffect(() => {
        setLoading(true)

        http.get(`cms/categories/${params.id}`)
            .then(({ data }) => setCategory(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        formik.setValues({
            name: category?.name,
            status: category?.status, 
        })
    }, [category])

    return <Container className="bg-white py-3 my-3 rounded-2 shadow-sm">
        {loading ? <Loading /> : <>
            <Row>
                <Col>
                    <h1>Edit Category</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="name" label="Name" />

                        <SelectField formik={formik} name="status" label="Status" options={{ 'Active': true, 'Inactive': false}} onChange={({ target }) => formik.setFieldValue('status', target.value == 'true')}/>

                        <SubmitBtn loading={formik.isSubmitting} />
                    </Form>
                </Col>
            </Row>
        </>}
    </Container>
}