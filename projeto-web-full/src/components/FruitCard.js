import Card from "@mui/material/Card";
import {Button, CardActions, CardMedia, Grid} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import {createPortal} from "react-dom";
import NutritionCard from "./NutritionCard";

const styleText = {
    fontFamily: 'Playpen Sans',
    fontWeight: '300'
}

const FruitCard = (props) => {
    const [showNutritionCard, setShowNutritionCard] = useState(false);

    const {
        name,
        genus,
        family,
        order
    } = props.fruit;

    return (
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
            <Card sx={{ maxWidth: 345, margin: '1%', padding: '1%' }}>
                <CardMedia
                    sx={{ height: 100 }}
                    image="frutas.jpg"
                    alt="Imagem Fruta"
                />
                <CardContent>
                    <Typography sx={{
                        textAlign: 'center',
                        fontFamily: 'Playpen Sans',
                        fontWeight: '500'
                    }}>
                        {name}
                    </Typography>
                    <Typography sx={styleText}>
                        <strong>Gênero:</strong> {genus}
                    </Typography>
                    <Typography sx={styleText}>
                        <strong>Família:</strong> {family}
                    </Typography>
                    <Typography sx={styleText}>
                        <strong>Ordem:</strong> {order}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                        disabled={showNutritionCard}
                        sx={{
                        backgroundColor: '#125C13',
                        color: '#FFF',
                        fontFamily: 'Playpen Sans',
                        fontWeight: '500',
                        borderRadius: 5,
                        fontSize: '12px',
                        padding: '3%',
                        width: '80%',
                        '&:hover': {
                            backgroundColor: '#FFF',
                            color: '#125C13'
                        }
                    }} onClick={() => {
                        setShowNutritionCard(true)
                    }}>
                        Informação Nutricional
                    </Button>
                </CardActions>
                {showNutritionCard && createPortal(
                    <NutritionCard nutritions={props.fruit.nutritions} setShowNutritionCard={setShowNutritionCard}/>,
                    document.body
                )}
            </Card>
        </Grid>
    );
}

export default FruitCard;
