import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function Good(props) {
  const { good } = props;
  const imagePath = "../images/" + good.image;
  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
          image={imagePath}
        />
      </Card>
      <CardContent sx={{ flex: 1 }}>
        <Typography component="h2" variant="h5">
          {good.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {good.releaseDate}
        </Typography>
        <Typography variant="subtitle1" paragraph>
          {good.price} рублей
        </Typography>
      </CardContent>
    </Grid>
  );
}

Good.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Good;