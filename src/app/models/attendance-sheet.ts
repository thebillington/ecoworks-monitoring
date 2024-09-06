import User from "./user"

export default class AttendanceSheet {
    date: Date
    comments: string
    attendees: Array<User>

    constructor(
        date: Date,
        comments: string,
        attendees: Array<User>
    ) {
        this.date = date
        this.comments = comments
        this.attendees = attendees
    }
}