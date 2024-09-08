'use server'

import AttendanceSheet from "@/app/models/attendance-sheet"
import User from "@/app/models/user"
import { todaysDateString } from "@/app/utilities"
import { google } from "googleapis"
import { redirect } from "next/navigation"

async function getGoogleAuthClient() {
  return await google.auth.getClient({
    projectId: process.env.GSHEETS_PROJECT_ID,
    credentials: {
      type: "service_account",
      private_key: process.env.GSHEETS_PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
      client_email: process.env.GSHEETS_SERVICE_EMAIL,
      client_id: process.env.GSHEETS_SERVICE_EMAIL,
      token_url: "https://oauth2.googleapis.com/token",
      universe_domain: "googleapis.com",
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
}

export async function getProjects(): Promise<Array<string>> {
  const auth = await getGoogleAuthClient()

  const sheets = google.sheets({ version: "v4", auth })

  const response = await sheets.spreadsheets.get({
    spreadsheetId: process.env.USERS_SPREADSHEET_ID
  })

  const projects: Array<string> = []
  const workbooks = response.data['sheets']?.map(sheet => sheet.properties?.title ?? undefined) ?? []
  for (let workbookName of workbooks) {
    if (workbookName?.indexOf('project') != -1) projects.push(
      workbookName?.replace('project_', '') ?? ''
    )
  }
  
  return projects
}

export async function attendanceSheetExistsFor(projectSlug: string, date: string): Promise<boolean> {
  const auth = await getGoogleAuthClient()

  const sheets = google.sheets({ version: "v4", auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.USERS_SPREADSHEET_ID,
    range: `project_${projectSlug}`,
  })

  const columnHeadings = response.data.values?.splice(0,1)[0]
  for (let row of response.data.values ?? []) {
    if (row[columnHeadings?.indexOf('date') ?? 0] == date) return true
  }

  return false
}

export async function getAttendanceSheet(projectSlug: string, date: string): Promise<AttendanceSheet> {
  const auth = await getGoogleAuthClient()

  const sheets = google.sheets({ version: "v4", auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.USERS_SPREADSHEET_ID,
    range: `project_${projectSlug}`,
  })

  const columnHeadings = response.data.values?.splice(0,1)[0]
  
  let attendees: Array<string> = []
  let comments: string = ''
  for (let row of response.data.values ?? []) {
    if (row[columnHeadings?.indexOf('date') ?? 0] == date) {
      comments = row[columnHeadings?.indexOf('comments') ?? 1]
      for (let i = columnHeadings?.indexOf('attendees') ?? 5; i < row.length; i++) {
        attendees.push(row[i])
      }
    }
  }

  return new AttendanceSheet(
    date,
    comments,
    attendees
  )
}

interface ISubmitAttendanceSheetResponse {
  message: string
}

export async function submitAttendanceSheet(
  date: string,
  projectSlug: string,
  attendees: Array<string>,
  additionalComments: string
): Promise<ISubmitAttendanceSheetResponse> {
  const hasAttendanceSheet = await attendanceSheetExistsFor(projectSlug, date)
  const userCounts = await countUserTypes(attendees)

  if (hasAttendanceSheet) return updateAttendanceSheet(
    date,
    projectSlug,
    attendees,
    additionalComments,
    userCounts
  )
  
  const auth = await getGoogleAuthClient()
  const sheets = google.sheets({ version: "v4", auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.USERS_SPREADSHEET_ID,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    range: `project_${projectSlug}`,
    requestBody: {
      values: [
        [
          date,
          additionalComments,
          userCounts.volunteerCount,
          userCounts.staffCount,
          userCounts.trusteeCount,
          ...attendees
        ]
      ],
    },
  })

  redirect(`/dashboard/project/${projectSlug}`)
}

async function updateAttendanceSheet(
  date: string,
  projectSlug: string,
  attendees: Array<string>,
  additionalComments: string,
  userCounts: ICountUserTypesResponse
): Promise<ISubmitAttendanceSheetResponse> {
  return { message: "success" }
}

interface ICountUserTypesResponse {
  volunteerCount: number,
  staffCount: number,
  trusteeCount: number
}

async function countUserTypes(
  attendees: Array<string>
): Promise<ICountUserTypesResponse> {
  const users = await getUsers()

  let volunteerCount = 0
  let staffCount = 0
  let trusteeCount = 0

  for (let attendee of attendees) {
    switch (users[attendee].type) {
      case 'volunteer': 
        volunteerCount++
        break
      case 'staff': 
        staffCount++
        break
      case 'trustee': 
        trusteeCount++
        break
    }
  }

  return {
    volunteerCount: volunteerCount,
    staffCount: staffCount,
    trusteeCount: trusteeCount
  }
}

async function getUsers(): Promise<Record<string, User>> {
  const auth = await getGoogleAuthClient()

  const sheets = google.sheets({ version: "v4", auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.USERS_SPREADSHEET_ID,
    range: 'users',
  })

  let users: Record<string, User> = {}

  const columnHeadings = response.data.values?.splice(0,1)[0]
  for (let row of response.data.values ?? []) {
    const email = row[columnHeadings?.indexOf('email') ?? 0]
    users[email] = createUserFromRow(email, row, columnHeadings as string[])
  }

  return users
}

function createUserFromRow(
  email: string,
  row: Array<string>,
  columnHeadings: Array<string>
): User {
  return new User(
    email,
    row[columnHeadings?.indexOf('name') ?? 1],
    row[columnHeadings?.indexOf('type') ?? 2],
    row[columnHeadings?.indexOf('phone') ?? 3],
    row[columnHeadings?.indexOf('addr') ?? 4],
    row[columnHeadings?.indexOf('postcode') ?? 5],
    row[columnHeadings?.indexOf('dob') ?? 6],
    row[columnHeadings?.indexOf('emergency_email') ?? 7],
    row[columnHeadings?.indexOf('emergency_name') ?? 8],
    row[columnHeadings?.indexOf('emergency_relation') ?? 9],
    row[columnHeadings?.indexOf('emergency_phone') ?? 10],
    row[columnHeadings?.indexOf('support_email') ?? 11],
    row[columnHeadings?.indexOf('support_name') ?? 12],
    row[columnHeadings?.indexOf('support_organisation') ?? 13],
    row[columnHeadings?.indexOf('support_phone') ?? 14],
    row[columnHeadings?.indexOf('medical_info') ?? 15],
    row[columnHeadings?.indexOf('additional_info') ?? 16]
  )
}

export async function getUsersForProject(projectSlug: string): Promise<Array<User>> {
  const allUsers = await getUsers()
  const previousAttendeeEmails = await getPreviousAttendeeEmails(projectSlug)
  let users: Array<User> = []

  for (let attendeeEmail of previousAttendeeEmails) {
    users.push(allUsers[attendeeEmail])
    delete allUsers[attendeeEmail]
  }

  for (let key in allUsers) users.push(allUsers[key])
  
  return users
}

export async function getUsersFromAttendanceSheet(
  attendanceSheet: AttendanceSheet
): Promise<Array<User>> {
  const auth = await getGoogleAuthClient()

  const sheets = google.sheets({ version: "v4", auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.USERS_SPREADSHEET_ID,
    range: 'users',
  })

  let users: Array<User> = []

  const columnHeadings = response.data.values?.splice(0,1)[0]
  for (let row of response.data.values ?? []) {
    const email = row[columnHeadings?.indexOf('email') ?? 0]
    if (attendanceSheet.attendees.indexOf(email) > -1) {
      users.push(
        createUserFromRow(email, row, columnHeadings as string[])
      )
    }
  }

  return users
}

async function getPreviousAttendeeEmails(projectSlug: string): Promise<Array<string>> {
  const auth = await getGoogleAuthClient()

  const sheets = google.sheets({ version: "v4", auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.USERS_SPREADSHEET_ID,
    range: `project_${projectSlug}`,
  })

  let attendees: Array<string> = []

  if (!response.data.values) return []

  const columnHeadings = response.data.values.splice(0,1)[0]
  const finalEntry = response.data.values[response.data.values.length - 1]
  for (let i = columnHeadings.indexOf('attendees'); i < finalEntry.length; i++) {
    attendees.push(finalEntry[i])
  }

  return attendees
}

interface IRegistrationFormResponse {
  message: string
  colour: string
}

export async function createUser(
  email: string,
  name: string,
  type: string
): Promise<IRegistrationFormResponse>  {

  const users = await getUsers()
  for (let key in users) {
    if (users[key].email == email) {
      return {
        message: "Email already registered",
        colour: "text-red-300"
      }
    }
  }

  const auth = await getGoogleAuthClient()
  const sheets = google.sheets({ version: "v4", auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.USERS_SPREADSHEET_ID,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    range: 'users',
    requestBody: {
      values: [ [ email, name, type, ] ],
    },
  })

  return {
    message: "Registration successful",
    colour: "text-green-300"
  }
}

export interface IProspectiveFormResponse {
  message: string
  colour: string
}

export async function createProspective(
  email: string,
  name: string
): Promise<IProspectiveFormResponse>  {

  const auth = await getGoogleAuthClient()
  const sheets = google.sheets({ version: "v4", auth })
  const date = todaysDateString()

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.USERS_SPREADSHEET_ID,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    range: 'prospects',
    requestBody: {
      values: [ [ date, email, name, ] ],
    },
  })

  return {
    message: "Interest registered successfully",
    colour: "text-green-300"
  }
}