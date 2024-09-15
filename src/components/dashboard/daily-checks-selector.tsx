import DailyChecksTickboxComponent from "./daily-checks/daily-checks-tickbox";

export interface IDailyChecksProps {
    checks: Array< { checkName: string, isComplete: boolean } >
}

export function DailyChecksComponent(
    props: IDailyChecksProps
) {
    return (
        <div className="flex flex-1 flex-col p-4 pb-0 max-w-sm">
            <div className="flex self-center w-full ml-2">
                <p className="text-2xl">Daily Checks</p>
            </div>
            <div className="w-full max-h-36 md:max-h-36 relative overflow-y-auto no-scrollbar my-2 rounded-md">
                <table className="w-full table-fixed text-sm text-left rounded-md rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr key="headings">
                            <th scope="col" className="px-6 py-3">Check</th>
                            <th scope="col" className="px-6 py-3">Is Complete?</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {
                            props.checks.map( ( check, i ) => 
                                <tr key={ check.checkName } className={`bg-white ${i != props.checks.length - 1 ? 'border-b ' : ' '} dark:bg-gray-800 dark:border-gray-700`}>
                                    <td className="flex font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <a className="w-full px-6 py-4" href="dashboard/checks/morning">{ check.checkName }</a>
                                    </td>
                                    <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <DailyChecksTickboxComponent isComplete={ check.isComplete } />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}