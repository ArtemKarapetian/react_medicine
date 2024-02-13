import * as React from 'react';
import useServerGoods from '../hooks/useServerGoods';
import Good from '../components/Good';
import { Grid, Box, Container, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';

function Goods() {
    const { goods, loadMoreGoods, isEnd, isLoading } = useServerGoods();
    return (
        <Box>
            <Container>
                <div>
                    <Grid container spacing={2}>
                        {goods.map((good) => (
                            <Grid item xs={4} key={good.id}>
                                <Good good={good} />
                            </Grid>
                        ))}
                    </Grid>
                    <Grid container justifyContent="center">
                        {!isEnd && 
                            <Button variant="outlined" onClick={loadMoreGoods}>
                                {isLoading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Показать больше"
                                )}
                            </Button>
                        }
                    </Grid>
                </div>
            </Container>
        </Box>
    );
}

export default Goods;
