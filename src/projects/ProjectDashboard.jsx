import React from 'react';
import ProjectGeneralInfo from "./components/ProjectGeneralInfo";

import { useProject } from "contexts/projects/ProjectContext";
import TestCard from "./components/TestCard";

// for dev
import cube from '../assets/img/testCard/cube.jpg';
import cube2 from '../assets/img/testCard/cube2.jpg';
import brain from '../assets/img/testCard/brain.jpeg';
import brain2 from '../assets/img/testCard/brain2.jpeg';
import brain3 from '../assets/img/testCard/brain3.jpg';
import brain4 from '../assets/img/testCard/brain4.jpg';
import AddTestCard from "./components/AddTestCard";
import AddTest from './components/forms/AddTest';

const imageArray = [cube, cube2, brain, brain2, brain3, brain4,];

const ProjectDashboard = () => {
    const { activeProject, activeTest, projects, selectActiveTest, getImage } = useProject();
    const [addTest, setAddTest] = React.useState(false);

    React.useEffect(() => {
        setAddTest(false)
    }, [activeProject]);

    return (
        <>
            <div className='text-white text-xs ml-4 mt-4'>
                <span className='underline uppercase'>{activeProject?.projectName}</span>
            </div>


            {addTest && (

                <AddTest
                    setAddTest={setAddTest}
                    activeProject={activeProject}
                />


            )}

            {!addTest && !activeTest && (
                <>
                    <div className="flex w-full items-start mt-4">
                        <ProjectGeneralInfo
                            project={activeProject || {}}
                        />
                    </div>
                    <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-4 w-full mt-4">

                        {projects?.filter((project) => project._id === activeProject._id)[0]?.tests?.map((test) => {
                            return (
                                <TestCard
                                    title={test.testName}
                                    // will get image from source (db) or if for some reason fails, default to one we provide up top.
                                    // image={test.testImage && !test.testImage.includes('TypeError') ? `data:image/png;base64, ${test.testImage}` : imageArray[Math.floor(Math.random() * imageArray.length)]}
                                    image={test.testImage && !test.testImage.includes('TypeError') ? `${getImage(test.testImage)}` : imageArray[Math.floor(Math.random() * imageArray.length)]}
                                    description={test.objectives}
                                    key={test.testName}
                                    selectActiveTest={selectActiveTest}
                                    test={test}

                                />
                            )
                        })}

                        <AddTestCard
                            title="Add Test Card"
                            image={cube2}
                            setAddTest={setAddTest}
                            description="Mock Description adfa **Enhance Engagement:** Elevate user engagement metrics, aiming for a 25% boost in page views and a 10% increase in the average..."
                        />

                    </div>
                </>
            )}
        </>
    );
};

export default ProjectDashboard;
