import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../user/AuthContext';
import Logtastic from '@ofrepose/logtastic';

const ProjectContext = createContext();

const API = 'http://localhost:5002/api/projects/';

export function ProjectProvider({ children }) {
    const { getUser } = useAuth();
    const [projects, setProjects] = useState();
    const [activeProject, setActiveProject] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [activeTest, setActiveTest] = useState(null);

    useEffect(() => {

        setLoading(true);

        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            setProjects(JSON.parse(storedProjects));
        }

        const storedActive = localStorage.getItem('active');
        if (storedActive) {
            setActiveProject(JSON.parse(storedActive));
        }

        const storedActiveTest = localStorage.getItem('activeTest');
        if (storedActiveTest) {
            setActiveTest(JSON.parse(storedActiveTest));
        }

        setLoading(false);

    }, []);

    useEffect(() => {
        if (projects) {
            localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            localStorage.removeItem('projects');
        }
    }, [projects]);

    useEffect(() => {
        if (activeProject) {
            localStorage.setItem('active', JSON.stringify(activeProject));
        } else {
            localStorage.removeItem('active');
        }
    }, [activeProject]);

    useEffect(() => {
        if (activeTest) {
            localStorage.setItem('activeTest', JSON.stringify(activeTest));
        } else {
            localStorage.removeItem('activeTest');
        }
    }, [activeTest]);

    const getHeaders = () => {
        return {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
        }
    }

    const selectActiveProject = (id) => {
        const activeProjectSelected = projects?.filter((item) => item._id === id);
        setActiveProject(() => activeProjectSelected?.[0] || null);
    }

    const selectActiveTest = (name) => {
        const activeTestSelected = activeProject?.tests?.filter((item) => item.testName === name);
        setActiveTest(() => activeTestSelected?.[0] || null);
    }

    // fix this. Make it more clean.
    const getImage = (imageName) => {
        let data;
        try {
           return API + `image/${imageName}.png`;
        } catch (error) {
            Logtastic.err(`❌ API - Projects: Error getting image: ${error.message}`, { escape: false });
        } finally {
            // setLoading(false);
        }
    }

    const getProjects = async () => {

        let data;
        try {
            setLoading(() => true);
            const response = await fetch(API + '', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                }
            });
            data = await response.json();
            setProjects(() => data);
            Logtastic.log(`✅ API - Getting Projects 🐧`, { color: 'green', style: 'dim' })
        } catch (error) {
            Logtastic.err(`❌ API - Projects: Error getting projects: ${error.message}`, { escape: false });
        } finally {
            setLoading(false);
        }
    }

    const getProjectsImage = async () => {
        let data;
        try {
            setLoading(() => true);
            const response = await fetch(API + `images/${activeProject._id}`, {
                method: 'GET',
                headers: getHeaders(),
            });
            data = await response.text();
            return data;
        }catch(error){
            Logtastic.err(`❌ API - Projects: Error getting projects: ${error.message}`, { escape: false });
        }finally{
            setLoading(false);
        }
    }

    const addTest = async (testData) => {
        setStatus(null);
        let data;
        testData.projectId = activeProject._id;
        try {
            setLoading(true);
            const response = await fetch(API + 'test/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify(testData),
            });
            data = await response.json();
            setProjects(() => data);
            setStatus(() => 'Success')
            Logtastic.log(`✅ API - Adding Test 🐧`, { color: 'green', style: 'dim' })
        } catch (error) {
            Logtastic.err(`❌ API - Projects: Error adding test: ${error.message}`, { escape: false });
            setStatus(() => "Failure")
        } finally {
            if (data?.errors) {
                setStatus("Failure");
            } else {
                setStatus(null);
            }
            setLoading(false);
        }
    }

    const addProject = async (appData) => {
        setStatus(null);
        let data;
        try {
            setLoading(() => true);
            const response = await fetch(API + 'add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify(appData),
            });

            data = await response.json();
            setProjects(() => data);
            setStatus(() => 'Success')
            Logtastic.log(`✅ API - Adding Project 🐧`, { color: 'green', style: 'dim' })
        } catch (error) {
            Logtastic.err(`❌ API - Projects: Error adding project: ${error.message}`, { escape: false });
            setStatus(() => "Failure")
        } finally {
            setLoading(false);
            if (data?.errors) {
                setStatus("Failure");
            } else {
                setStatus(null);
            }
            return data;
        }

    };


    const editProject = async (appData) => {
        setStatus(null);
        let data;
        try {
            setLoading(() => true);
            const response = await fetch(API + 'edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify(appData),
            });

            data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error editing application:', error);
            setStatus(() => "Failure")
        } finally {
            await getUser();
            setLoading(false);
            if (data?.errors) {
                setStatus("Failure");
            } else {
                setStatus("Success");
            }
        }

    };


    const deleteApplication = async (appData) => {
        setStatus(null);
        let data;
        try {
            setLoading(() => true);
            const response = await fetch(API + 'delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify(appData),
            });

            data = await response.json();
            await getUser();
        } catch (error) {
            console.error('Error deleting application:', error);
            setStatus(() => "Failure")
        } finally {
            await getUser();
            setLoading(false);
            if (data?.errors) {
                setStatus("Failure");
            } else {
                setStatus("Success");
            }
        }

    };

    return (
        <ProjectContext.Provider
            value={{
                projects,
                isLoading,
                addProject,
                editProject,
                deleteApplication,
                setProjects,
                status,
                getProjects,
                selectActiveProject,
                activeProject,
                isAdding,
                setIsAdding,
                addTest,
                selectActiveTest,
                activeTest,
                getProjects,
                getProjectsImage,
                getImage
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
}

export function useProject() {
    return useContext(ProjectContext);
}