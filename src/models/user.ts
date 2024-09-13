import { Nullable } from "@/types"

export default class User {
    email: Nullable<string>
    name: Nullable<string>
    type: Nullable<string>

    phone: Nullable<string>
    addr: Nullable<string>
    postcode: Nullable<string>
    dob: Nullable<string>

    emergency_email: Nullable<string>
    emergency_name: Nullable<string>
    emergency_relation: Nullable<string>
    emergency_phone: Nullable<string>

    support_email: Nullable<string>
    support_name: Nullable<string>
    support_organisation: Nullable<string>
    support_phone: Nullable<string>

    medical_info: Nullable<string>
    additional_info: Nullable<string>

    employment_details: Nullable<string>
    cultural_background: Nullable<string>

    constructor(
        email: Nullable<string> = null,
        name: Nullable<string> = null,
        type: Nullable<string> = null,
        phone: Nullable<string> = null,
        addr: Nullable<string> = null,
        postcode: Nullable<string> = null,
        dob: Nullable<string> = null,
        emergency_email: Nullable<string> = null,
        emergency_name: Nullable<string> = null,
        emergency_relation: Nullable<string> = null,
        emergency_phone: Nullable<string> = null,
        support_email: Nullable<string> = null,
        support_name: Nullable<string> = null,
        support_organisation: Nullable<string> = null,
        support_phone: Nullable<string> = null,
        medical_info: Nullable<string> = null,
        additional_info: Nullable<string> = null,
        employment_details: Nullable<string> = null,
        cultural_background: Nullable<string> = null
    ) {
        this.email = email
        this.name = name
        this.type = type
        this.phone = phone
        this.addr = addr
        this.postcode = postcode
        this.dob = dob
        this.emergency_email = emergency_email
        this.emergency_name = emergency_name
        this.emergency_relation = emergency_relation
        this.emergency_phone = emergency_phone
        this.support_email = support_email
        this.support_name = support_name
        this.support_organisation = support_organisation
        this.support_phone = support_phone
        this.medical_info = medical_info
        this.additional_info = additional_info
        this.employment_details = employment_details
        this.cultural_background = cultural_background
    }
}