import Header from './Header';

const sections = [
    { title: 'Главная страница', url: '/' },
];

const privateSections = [
    { title: 'Каталог', url: '/goods' },
];

const routeTitles = {
    '/': 'Главная страница',
    '/login': 'Вход',
    '/createnewdb': 'Создание новой базы данных',
    '/signup': 'Регистрация',
    '/goods': 'Каталог',
};

function DefaultHeader() {
    return (
        <Header titles={routeTitles} sections={sections} privateSections={privateSections} />
    )
}

export default DefaultHeader;