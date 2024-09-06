import { unslug } from "@/app/utilities"

export default function ProjectInformationPage( { params } : { params: { slug: string }} ) {
    return `${unslug(params.slug)} - Register`
}