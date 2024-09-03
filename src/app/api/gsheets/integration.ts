import User from "@/app/models/user"
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
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  })
}

export async function getUsers() {
  const auth = await getGoogleAuthClient()

  const sheets = google.sheets({ version: "v4", auth })

  const data = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.USERS_SPREADSHEET_ID,
    range: 'users',
  })

  let users: Array<User> = [];

  const columnHeadings = data.data.values?.splice(0,1)[0]
  for (let row of data.data.values ?? []) {
    users.push(
      new User(
        row[columnHeadings?.indexOf('email') ?? 0],
        row[columnHeadings?.indexOf('name') ?? 1],
      )
    )
  }

  return users
}