import React, { useCallback } from 'react';

export function useHandleKeyPress() {
    const [searchOpen, setSearchOpen] = React.useState(false);

    const handleKeyPress = useCallback(( event ) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'S') {
            setSearchOpen(prev => !prev);
        }
    }, [setSearchOpen])

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    React.useEffect(() => {
        if (searchOpen) {
            const searchInput = document.getElementById('search');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }, [searchOpen])

    return [searchOpen, setSearchOpen, handleKeyPress]
}