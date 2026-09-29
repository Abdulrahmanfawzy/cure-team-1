import axios from "axios"
import type { ResponseSpecificDoctor } from "../types/appointment.types"
import type { ReviewFormValues } from "../Schemas/reviewSchema"

export const appointmentApi = {
    async getSpecificDoctor(id: string): Promise<ResponseSpecificDoctor> {
        const { data } = await axios.get("https://round-13-cure.huma-volve.com/api/doctor/" + id)
        return data.data
    }
    ,
    async createReview(id: string, formdata: ReviewFormValues) {
        const { data } = await axios.post(`https://round-13-cure.huma-volve.com/api/booking/${id}/feedback`, formdata, {
            headers: {
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3JvdW5kLTEzLWN1cmUuaHVtYS12b2x2ZS5jb20vYXBpL2F1dGgvbG9naW4vdmVyaWZ5IiwiaWF0IjoxNzkwNjQ3NDQ5LCJleHAiOjQ3OTA2NDc0NDksIm5iZiI6MTc5MDY0NzQ0OSwianRpIjoiQk82czhVbVRnc1Q4WWFrRCIsInN1YiI6IjAxYTBlYWU2LWFjYzUtNzBjNS1iNGZjLTE1NThmMTM4N2Y2ZiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.frAw4HJMOG7IZlmHXB6ZNfaWFQOYwvIa7CwUveiZ_Zo"
            }
        })
        return data.data

    }
}   