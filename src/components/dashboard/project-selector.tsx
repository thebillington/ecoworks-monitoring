import { ProjectData } from "@/app/api/gsheets/integration"

interface IProjectSelectorProps {
    projects: Array<ProjectData>
}

export default function ProjectSelectorComponent(props: IProjectSelectorProps) {
    return (
        <div>
            <div className="w-48 text-center">Take Register</div>
            <ul className="w-48 my-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {
                    props.projects.map( (project, i) =>
                        <a href={`/project/${project.slug}`}>
                            <li key={ project.slug } className={`w-full px-4 py-2 ${i == props.projects.length - 1 ? 'rounded-t-lg' : 'border-b  border-gray-200'}`}>
                                { project.name }
                            </li>
                        </a>
                    )
                }
            </ul>
        </div>
    )
}