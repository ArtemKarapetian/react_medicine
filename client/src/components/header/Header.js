import React from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import HealingIcon from '@mui/icons-material/Healing';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useAuth } from '../../AuthContext';

function Header(props) {
  const { titles, sections: initialSections, privateSections } = props;
  const navigate = useNavigate();
  const [sections, setSections] = React.useState(initialSections);
  const { isLoggedIn, logout, username } = useAuth();

  const handleLoginClick = () => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <HealingIcon sx={{ mr: 2 }} />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          {titles[window.location.pathname] || 'Неопределенная страница'}
        </Typography>
        {isLoggedIn && (<Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="right"
        noWrap
        sx={{ flex: 1, marginRight: '10px' }}
        > {username}</Typography>)}
        <Button variant="outlined" size="small" onClick={handleLoginClick}>
          {isLoggedIn ? 'Выйти' : 'Войти'}
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
        {isLoggedIn && privateSections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}


Header.propTypes = {
  sections: PropTypes.arrayOf(
      PropTypes.shape({
          title: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
      }),
  ).isRequired,
  privateSections: PropTypes.arrayOf(
    PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }),
).isRequired,
  titles: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default Header;
