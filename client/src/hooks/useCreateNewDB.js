import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';

function useCreateNewDB() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { logout } = useAuth();

    useEffect(() => {
        fetch('/createnewdb')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Не получилось получить данные');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => setError(error));
        logout();
    }, []);

    return { data, error };
}

export default useCreateNewDB;