import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React, {useCallback, useEffect} from "react";
import {Button} from "@mui/material";

const styleText = {
    fontFamily: 'Playpen Sans',
    fontWeight: '300',
    fontSize: "18px",
}
const NutritionCard = (props) => {
    const { carbohydrates, protein, fat, calories, sugar } = props.nutritions

    const handleOnClickInside = useCallback((event) => {
        if (event.target.closest('#nutritionCardModal')) {
            return;
        }

        props.setShowNutritionCard(false);
    }, [props]);

    useEffect(() => {
        document.addEventListener("mousedown", handleOnClickInside);

        return () => {
            document.removeEventListener("mousedown", handleOnClickInside);
        };
    }, [handleOnClickInside]);

    return (
        <Container id="nutritionCardModal" sx={{
            display: 'flex',
            flexDirection: 'column',
            position: "fixed",
            top: "50%",
            left: "50%",
            height: '50%',
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            transform: "translate(-50%, -50%)",
            textAlign: 'center',
            backgroundColor: "#E8E1D9",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}>
            <Typography sx={styleText}>
                <strong>Carboidratos:</strong> {carbohydrates}g
            </Typography>
            <Typography sx={styleText}>
                <strong>Proteína:</strong> {protein}g
            </Typography>
            <Typography sx={styleText}>
                <strong>Gordura:</strong> {fat}g
            </Typography>
            <Typography sx={styleText}>
                <strong>Calorias:</strong> {calories}kcal
            </Typography>
            <Typography sx={styleText}>
                <strong>Açúcar:</strong> {sugar}g
            </Typography>
            <Button
                variant="contained"
                onClick={() => {props.setShowNutritionCard(false)}}
                sx={{
                    marginTop: "16px",
                    backgroundColor: '#125C13',
                    width: '50%',
                    '&:hover': {
                        backgroundColor: '#E8E1D9',
                        color: '#125C13'
                    }
                }}>
                Fechar
            </Button>
        </Container>
    );
}

export default NutritionCard
