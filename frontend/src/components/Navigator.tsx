import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Navigator = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/ads');
    });
    return <></>;
};

export default Navigator;
