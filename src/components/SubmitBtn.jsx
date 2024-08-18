import { Button } from "react-bootstrap"

export const SubmitBtn = ({ variant = 'dark', loading = false, icon = 'fa-save', label = 'Save' }) => {
    return <Button type="submit" variant={variant} disabled={ loading }>
        <i className={`fa-solid ${ loading ? 'fa-refresh fa-spin' : icon} me-2`} /> { label }
    </Button>
}