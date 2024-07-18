import Card from "components/card";
import React from "react";

const ProjectGeneralInfo = ({ project }) => {
    const {
        projectName,
        domain,
        description,
        start,
        stop,
        audience,
        conversionGoals,
        objectives,
        notifications,
        projectIdentifier,
        projectLink,
        checkedIn
    } = project;
    return (
        <Card extra={"w-full h-full p-3 bg-gray-light shadow-xl"}>
            {/* Header */}
            <div className="mt-2 mb-4 w-full">
                <h4 className="px-2 text-xl font-bold text-white dark:text-white">
                    {projectName} <span className={`text-xs ${checkedIn ? 'text-green-400' : 'text-red-400'}`}>{checkedIn ? 'Verified' : 'Unverified'}</span>
                </h4>
                <h4 className="px-2 mt-4 text-lg font-bold text-white dark:text-white">
                    Description
                </h4>
                <p className="mt-2 px-2 text-base text-gray-400">
                    {description}
                </p>
            </div>
            {/* Cards */}
            <div className="grid grid-cols-2 gap-4 px-2">
                <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-400 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-0">Domain</p>
                    <p className="text-base font-medium text-gray-light dark:text-white">
                        {domain}
                    </p>
                </div>

                <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-400 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-0">Project Audience</p>
                    <p className="text-base font-medium text-gray-light dark:text-white">
                        {audience}
                    </p>
                </div>

                <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-400 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-0">Conversion Goals</p>
                    <p className="text-base font-medium text-gray-light dark:text-white">
                        {conversionGoals}
                    </p>
                </div>

                <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-400 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-0">Script Code</p>
                    <p className="text-xs py-1 text-gray-light dark:text-white">
                    /api/projects/data/sync/{projectLink} - <span className="text-brand-400 hover:text-brand-600 font-bold uppercase text-xs cursor-pointer">[copy]</span>
                    </p>
                </div>



                {/* <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-400 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-0">Education</p>
                    <p className="text-base font-medium text-white dark:text-white">
                        Stanford University
                    </p>
                </div>

                <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-400 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-0">Education</p>
                    <p className="text-base font-medium text-white dark:text-white">
                        Stanford University
                    </p>
                </div> */}
            </div>

            <div className="mt-4 mb-8 w-full">
                <h4 className="px-2 text-lg font-bold text-white dark:text-white">
                    Objectives
                </h4>
                <p className="mt-2 px-2 text-base text-gray-400">
                    {objectives}
                </p>
            </div>
        </Card>
    );
};

export default ProjectGeneralInfo;
