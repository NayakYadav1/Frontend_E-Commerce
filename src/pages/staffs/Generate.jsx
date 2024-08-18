// import { Loading } from "@/components"
// import http from "@/http"
// import { useEffect } from "react"

// export const Generate = () => {
//     useEffect(() => {
//         for(let i = 1; i< 53; i++){
//             let data = {
//                 name: `Person ${i}`,
//                 email: `person.${i}@gmail.com`,
//                 password: 'Password@123',
//                 confirmPassword: 'Password@123',
//                 phone: '9851017559',
//                 address: `Location ${i}`,
//                 status: true
//             }

//             http.post('/cms/staffs')
//                 .then(() => {})
//                 .catch(() => {})
//                 .finally(() => )
//         }
//     }, [])

//     return <Loading />
// }