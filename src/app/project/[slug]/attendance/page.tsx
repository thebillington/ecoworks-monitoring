import { unslug } from "@/app/utilities"

export default function ProjectInformationPage( { params } ) {
    return `${unslug(params.slug)} - Register`
}