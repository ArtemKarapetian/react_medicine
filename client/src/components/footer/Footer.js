import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';

function Footer(props) {
  const { description, title, social } = props;
  
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      display="flex"
      justifyContent="center"
      padding={0}
      width="100%"
      bgcolor="#DDDDDD"
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            {description}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {social.map((item) => (
                <li key={item.name}>
                  <Link href={item.link} color="inherit">
                    <item.icon />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType,
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Footer;