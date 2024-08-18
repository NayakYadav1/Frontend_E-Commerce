import { Form } from "react-bootstrap"

export const SelectField = ({ formik, name, label, options = {}, onChange }) => {
    return <div className="mb-3">
        <Form.Label htmlFor={name}></Form.Label>
        <Form.Select 
            name={name}
            id={name}
            value={formik.values[name]} 
            isInvalid={formik.touched[name] && formik.errors[name]} 
            isValid={formik.values[name] && !formik.errors[name]} 
            onChange={onChange ? onChange : ({ target }) => formik.setFieldValue(name, target.value)} 
            onBlur={formik.handleBlur}
        >
            {Object.keys(options).map(k => <option value={options[k]} key={k}>{k}</option>)}
        </Form.Select>
        {formik.touched.status && formik.errors.status && <Form.Control.Feedback type="invalid">
            {formik.errors.status}    
        </Form.Control.Feedback>}
    </div>
}