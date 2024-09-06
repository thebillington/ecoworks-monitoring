import User from "@/app/models/user"
import { titleCase } from "@/app/utilities"
import { google } from "googleapis"

async function getGoogleAuthClient() {
  return await google.auth.getClient({
    projectId: process.env.GSHEETS_PROJECT_ID,
    credentials: {
      type: "service_account",
      private_key: process.env.GSHEETS_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
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

export async function getAttendanceSheet(projectSlug: string, date: Date) {

}

export async function getUsers(): Promise<Array<User>> {
  const auth = await getGoogleAuthClient()

  const sheets = google.sheets({ version: "v4", auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.USERS_SPREADSHEET_ID,
    range: 'users',
  })

  let users: Array<User> = []

  const columnHeadings = response.data.values?.splice(0,1)[0]
  for (let row of response.data.values ?? []) {
    users.push(
      new User(
        row[columnHeadings?.indexOf('email') ?? 0],
        row[columnHeadings?.indexOf('name') ?? 1],
      )
    )
  }

  return users
}

export async function createUser(
  email: string,
  name: string,
  type: string
): Promise<IRegistrationFormResponse>  {

  const users = await getUsers()
  for (let user of users) {
    if (user.email == email) {
      return {
        message: "Email already registered",
        colour: "text-red-300"
      }
    }
  }

  const auth = await getGoogleAuthClient()
  const sheets = google.sheets({ version: "v4", auth })

  const data = await sheets.spreadsheets.values.append({
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