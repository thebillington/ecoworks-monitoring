import { attendanceSheetExistsFor } from "@/app/api/gsheets/integration";
import { todaysDateString, unslug } from "@/app/utilities";

export default async function ProjectInformationPage( { params } : { params: { slug: string }} ) {
    const today = todaysDateString()
    if (await attendanceSheetExistsFor(params.slug, today)) {
        return unslug(params.slug)
    }
    return (
        <div className='h-screen flex items-center justify-center'>   
            <div className='block text-center space-y-5 max-w-xs'>
                <p>There is no { unslug(params.slug) } attendance sheet for { today }</p>
                <button className="w-4/6 my-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Take Register</button>
            </div>
        </div>
    )
}