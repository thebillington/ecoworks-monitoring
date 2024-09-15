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

    // Needed as a hacky workaround since the user object can't be passed to a Server Action
    static FromJSON(json: string): User {
        const obj = JSON.parse(json)
        return new User(
            obj.email,
            obj.name,
            obj.type,
            obj.phone,
            obj.addr,
            obj.postcode,
            obj.dob,
            obj.emergency_email,
            obj.emergency_name,
            obj.emergency_relation,
            obj.emergency_phone,
            obj.support_email,
            obj.support_name,
            obj.support_organisation,
            obj.support_phone,
            obj.medical_info,
            obj.additional_info,
            obj.employment_details,
            obj.cultural_background
        )
    }

    hasFinishedRegistration(): boolean {
        return (
            this.email != null &&
            this.name != null &&
            this.type != null &&
            this.phone != null &&
            this.addr != null &&
            this.postcode != null &&
            //this.dob != null &&
            this.emergency_email != null &&
            this.emergency_name != null &&
            this.emergency_relation != null &&
            this.emergency_phone != null
        )
    }

    pretty() {
        return `Email: ${this.email}
Name: ${this.name}
User Type: ${this.type}\n
Phone: ${this.phone}
Address: ${this.addr}
Postcode: ${this.postcode}
DOB: ${this.dob}\n
Emergency Contact Name: ${this.emergency_name}
Emergency Contact Relationship: ${this.emergency_relation}
Emergency Contact Email: ${this.emergency_email}
Emergency Contact Phone: ${this.emergency_phone}\n
Support Worker Name: ${this.support_name}
Support Worker Organisation: ${this.support_organisation}
Support Worker Email: ${this.support_email}
Support Worker Phone: ${this.support_phone}\n
Medical Info: ${ this.medical_info ?? '' }\n
Additional Info: ${ this.additional_info ?? '' }\n
Employment Details: ${this.employment_details}
Cultural Background: ${this.cultural_background}`
    }
}