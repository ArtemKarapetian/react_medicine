import useCreateNewDB from '../hooks/useCreateNewDB';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const sections = [
    { title: 'Каталог', url: '#' },
    { title: 'Описания', url: '#' },
  ];

function CreateNewDB() {
    const { error } = useCreateNewDB();

    return (
    <>
        {error ? (
            <div>
                <Typography variant="body1" align="center">
                    Ошибка: {error.message}
                </Typography>
            </div>
        ) : (
            <div>
                <Typography variant="body1" align="center">
                    Новая база данных создана успешно
                </Typography>
            </div>
        )}
    </>
    )
}

export default CreateNewDB;