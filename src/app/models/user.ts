export default class User {
    email: string
    name: string
    type: string

    phone: string
    addr: string
    postcode: string
    dob: string

    emergency_email: string
    emergency_name: string
    emergency_relation: string
    emergency_phone: string

    support_email: string
    support_name: string
    support_organisation: string
    support_phone: string

    medical_info: string
    additional_info: string

    constructor(
        email: string,
        name: string,
        type: string,
        phone: string,
        addr: string,
        postcode: string,
        dob: string,
        emergency_email: string,
        emergency_name: string,
        emergency_relation: string,
        emergency_phone: string,
        support_email: string,
        support_name: string,
        support_organisation: string,
        support_phone: string,
        medical_info: string,
        additional_info: string
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
    }
}