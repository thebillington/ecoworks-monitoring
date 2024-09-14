export default class AttendanceSheet {
    date: string
    comments: string
    attendees: Array<string>

    constructor(
        date: string,
        comments: string,
        attendees: Array<string>
    ) {
        this.date = date
        this.comments = comments
        this.attendees = attendees
    }
}