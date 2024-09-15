import { unslug } from "@/utilities"

interface IProjectSelectorProps {
    projects: Array<string>
}

export default function ProjectSelectorComponent(props: IProjectSelectorProps) {
    return (
        <div className="flex flex-col p-4 pb-0 max-w-sm">
            <div className="flex self-center w-full ml-2">
                <p className="text-2xl">Select Project</p>
            </div>
            <div className="w-full max-h-72 relative overflow-y-auto no-scrollbar my-2 rounded-md">
                <table className="h-full w-full table-fixed text-sm text-left rounded-md rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr key="headings">
                            <th scope="col" className="px-6 py-3">Project</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {
                            props.projects.map( (projectSlug, i) =>
                                <tr key={ projectSlug } className={`bg-white ${i != props.projects.length - 1 ? 'border-b ' : ' '}dark:bg-gray-800 dark:border-gray-700`}>
                                    <td scope="row" className="flex font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <a className="w-full px-6 py-4" href={`dashboard/project/${projectSlug}`} key={ projectSlug } >
                                            { unslug(projectSlug) }
                                        </a>
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