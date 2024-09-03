import { google } from "googleapis";

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

export async function getGoogleSheetsData(range: string) {
  const auth = await getGoogleAuthClient()

  const sheets = google.sheets({ version: "v4", auth })

  const data = await sheets.spreadsheets.values.get({
    spreadsheetId: '1x1U5t8sft99eYVaok1OT1cMt4AuW_fbmrmARM300MN8',
    range: range,
  })

  return data.data.values
}