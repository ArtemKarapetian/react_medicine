import Footer from "./Footer"
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';

const footer = {
    title:
      'Карапетян Артём, 2024',
    description: '',
    social: [
      { name: 'GitHub', icon: GitHubIcon, link: 'https://github.com/ArtemKarapetian' },
      { name: 'Telegram', icon: TelegramIcon, link: 'https://t.me/kg_artem' },
    ],
};

function DefaultFooter() {
    return (
      <>
        <div style={{ padding: '10rem 2rem' }}></div>
        <Footer
          title={footer.title}
          description={footer.description}
          social={footer.social}
        />
      </>
   );
}

export default DefaultFooter;