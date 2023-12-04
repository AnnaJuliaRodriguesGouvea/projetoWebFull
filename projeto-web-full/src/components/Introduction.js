import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Introduction = () => {
    return (
        <Box sx={{ p: 4, textAlign: 'center', width: '35%'}}>
            <Typography variant="h4" sx={{ fontFamily: 'Playpen Sans', fontWeight: '500' }}>
                Olá,
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Playpen Sans', fontWeight: '300' }}>
                Aqui é possível fazer as buscas dos valores nutricionais de algumas frutas pelo nome, gênero, família ou ordem!
            </Typography>
        </Box>
    )
}

export default Introduction;