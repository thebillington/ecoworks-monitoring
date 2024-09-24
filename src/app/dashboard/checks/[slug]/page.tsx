import { getQuestionsForChecklist } from "@/app/api/gsheets/integration"
import DailyChecksCompletionComponent from "@/components/dashboard/daily-checks/daily-checks-completion"
import { unslug } from "@/utilities"

export default async function TakeAttendancePage( { params } : { params: { slug: string } } ) {
    const questions = await getQuestionsForChecklist( params.slug )
    return (
        <div className="flex h-screen flex-col">
            <div className="flex flex-col self-center w-5/6 mt-8 mb-4 max-w-sm md:max-w-lg lg:max-w-2xl ml-4">
                <p className="text-2xl">{ unslug(params.slug) } Checks</p>
            </div>
            <div className="flex flex-1 justify-center">
                <div className="w-5/6 max-w-sm md:max-w-lg lg:max-w-2xl">
                    <DailyChecksCompletionComponent questions={ questions } checklistSlug={ params.slug } />
                </div>
            </div>
        </div>
    )
}