import { InputField, SubmitBtn } from "@/components"
import http from "@/http"
import { handleValidationError } from "@/lib"
import { setUser } from "@/store"
import { useFormik } from "formik"
import { Container, Row, Col, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import YupPassword from "yup-password"

YupPassword(Yup)

export const Password = () => {
    const formik = useFormik({
        initialValues: {
            oldPassword: '',            
            newPassword: '',            
            confirmPassword: '',            

        }, 
        validationSchema: Yup.object({
            oldPassword: Yup.string().required(),
            newPassword: Yup.string().required()
                .minLowercase(1).minUppercase(1)
                .minNumbers(1).minSymbols(1).min(6),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('newPassword')], 'New Password Not Confirmed')
        }),
        onSubmit: (data, { setSubmitting }) => {
            http.patch('/profile/password', data)
                .then(() => {})
                .catch(({ response }) => handleValidationError(formik, response.data))
                .finally(() => setSubmitting(false))
        }
    })

    return <Container className="bg-white py-3 my-3 rounded-2 shadow-sm">
        <Row>
            <Col>
                <h1>Change Password</h1>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit}>
                    <InputField formik={formik} type="password" name="oldPassword" label="Old Password" />
                    <InputField formik={formik} type="password" name="newPassword" label="New Password" />
                    <InputField formik={formik} type="password" name="confirmPassword" label="Confirm Password" />

                    <SubmitBtn loading={formik.isSubmitting} />
                </Form>
            </Col>
        </Row>
    </Container>
}