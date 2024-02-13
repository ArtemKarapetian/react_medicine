import { useState, useEffect } from 'react';

const useServerGoods = () => {
    const [goods, setGoods] = useState([]);
    const [page, setPage] = useState(1);
    const [isEnd, setEnd] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const fetchGoods = async () => {
        try {
            const response = await fetch(`/goods?page=${page}`);
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching goods:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchGoods = async () => {
            try {
                const response = await fetch(`/goods?page=${page}`);
                const data = await response.json();
                const newGoods = Array.isArray(data) ? data : [];
                setGoods(newGoods);
            } catch (error) {
                console.error('Error fetching goods:', error);
            }
        };
        setPage(2)
        fetchGoods();
    }, []);

    const loadMoreGoods = async () => {
        setLoading(true);

        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(500);

        const newGoods = await fetchGoods();
        if (newGoods.length < 10) {
            setEnd(true);
        }
        setGoods((prevGoods) => [...prevGoods, ...newGoods]);
        setPage((prevPage) => prevPage + 1);

        setLoading(false);
    };

    return { goods, loadMoreGoods, isEnd, setEnd, isLoading };
};

export default useServerGoods;
