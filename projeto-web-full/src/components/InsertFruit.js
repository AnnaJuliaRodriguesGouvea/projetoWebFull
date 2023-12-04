import {Button, TextField} from "@mui/material";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {getFruits, insertFruit} from "../service/fruitService";

const styleButton = {
    marginTop: "16px",
    backgroundColor: '#125C13',
    width: '40%',
    '&:hover': {
        backgroundColor: '#E8E1D9',
        color: '#125C13'
    }
}

const styleTextField = {
    marginBottom: '20px',
    width: '60%'
}

const InsertFruit = () => {
    const context = useContext(AppContext)
    const [name, setName] = useState('');
    const [family, setFamily] = useState('');
    const [order, setOrder] = useState('');
    const [genus, setGenus] = useState('');
    const [calories, setCalories] = useState('');
    const [fat, setFat] = useState('');
    const [sugar, setSugar] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [protein, setProtein] = useState('');
    const [errorName, setErrorName] = useState('')
    const [errorFamily, setErrorFamily] = useState('')
    const [errorOrder, setErrorOrder] = useState('')
    const [errorGenus, setErrorGenus] = useState('')
    const [errorCalories, setErrorCalories] = useState('')
    const [errorFat, setErrorFat] = useState('')
    const [errorSugar, setErrorSugar] = useState('')
    const [errorCarbohydrates, setErrorCarbohydrates] = useState('')
    const [errorProtein, setErrorProtein] = useState('')

    const clearErrors = () => {
        setErrorName(null)
        setErrorFamily(null)
        setErrorOrder(null)
        setErrorGenus(null)
        setErrorCalories(null)
        setErrorFat(null)
        setErrorSugar(null)
        setErrorCarbohydrates(null)
        setErrorProtein(null)
    }

    const handleClear = () => {
        setName('');
        setFamily('');
        setOrder('');
        setGenus('');
        setCalories('');
        setFat('');
        setSugar('');
        setCarbohydrates('');
        setProtein('');
    };

    const handleAdd = async () => {
        try {
            const fruit = {
                name: name,
                family: family,
                order: order,
                genus: genus,
                calories: calories,
                fat: fat,
                sugar: sugar,
                carbohydrates: carbohydrates,
                protein: protein
            }

            clearErrors()

            const result = await insertFruit(fruit);
            if(result && result.status === 201) {
                try {
                    let result = await getFruits(context.limit, context.page, null, null)
                    if(result && result.status === 200) {
                        context.setPageCount(result.data.pageCount)
                        context.setFruits(result.data.rows)
                        context.setAlertError(false)
                        handleClear();
                        context.setShowInsertFruit(false)
                    } else if (result && result.status === 204) {
                        context.setAlertError(true)
                        context.setPageCount(1)
                        context.setFruits([])
                    }
                } catch (err) {
                    if(err.data.toLowerCase().includes("token")) {
                        context.setAuthenticated(false)
                        localStorage.clear()
                    } else {
                        context.setAlertError(true)
                    }
                }
            }
        } catch (err) {
            if(err.data.toLowerCase().includes("token")) {
                context.setAuthenticated(false)
                localStorage.clear()
            }
            if(err.data.toLowerCase().includes("nome"))
                setErrorName(err.data)
            if(err.data.toLowerCase().includes("família"))
                setErrorFamily(err.data)
            if(err.data.toLowerCase().includes("ordem"))
                setErrorOrder(err.data)
            if(err.data.toLowerCase().includes("gênero"))
                setErrorGenus(err.data)
            if(err.data.toLowerCase().includes("calorias"))
                setErrorCalories(err.data)
            if(err.data.toLowerCase().includes("gordura"))
                setErrorFat(err.data)
            if(err.data.toLowerCase().includes("açúcar"))
                setErrorSugar(err.data)
            if(err.data.toLowerCase().includes("carboidratos"))
                setErrorCarbohydrates(err.data)
            if(err.data.toLowerCase().includes("proteína"))
                setErrorProtein(err.data)
        }
    };

    const handleOnClickInside = useCallback((event) => {
        if (event.target.closest('#insertFruitModal')) {
            return;
        }

        context.setShowInsertFruit(false);
    }, [context]);

    useEffect(() => {
        document.addEventListener("mousedown", handleOnClickInside);

        return () => {
            document.removeEventListener("mousedown", handleOnClickInside);
        };
    }, [handleOnClickInside]);

    return (
        <Container id="insertFruitModal" sx={{
            display: 'flex',
            flexDirection: 'column',
            position: "fixed",
            top: "50%",
            left: "50%",
            height: '90%',
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            transform: "translate(-50%, -50%)",
            textAlign: 'center',
            backgroundColor: "#E8E1D9",
            padding: "5%",
            paddingTop: '12%',
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            overflow: "auto"
        }}>
            <Typography
                variant="h6"
                sx={{
                    fontFamily: 'Playpen Sans',
                    fontWeight: '500',
                    fontSize: '40px',
                    letterSpacing: '.2rem',
                    marginBottom: '2%'
                }}
            >
                Adicionar Fruta
            </Typography>
            <TextField
                required
                error={Boolean(errorName)}
                helperText={errorName}
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={styleTextField}
            />
            <TextField
                required
                error={Boolean(errorFamily)}
                helperText={errorFamily}
                label="Família"
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                sx={styleTextField}
            />
            <TextField
                required
                error={Boolean(errorOrder)}
                helperText={errorOrder}
                label="Ordem"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                sx={styleTextField}
            />
            <TextField
                required
                error={Boolean(errorGenus)}
                helperText={errorGenus}
                label="Gênero"
                value={genus}
                onChange={(e) => setGenus(e.target.value)}
                sx={styleTextField}
            />
            <TextField
                required
                error={Boolean(errorCalories)}
                helperText={errorCalories}
                label="Calorias"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                sx={styleTextField}
            />
            <TextField
                required
                error={Boolean(errorFat)}
                helperText={errorFat}
                label="Gordura"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                sx={styleTextField}
            />
            <TextField
                required
                error={Boolean(errorSugar)}
                helperText={errorSugar}
                label="Açúcar"
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
                sx={styleTextField}
            />
            <TextField
                required
                error={Boolean(errorCarbohydrates)}
                helperText={errorCarbohydrates}
                label="Carboidratos"
                value={carbohydrates}
                onChange={(e) => setCarbohydrates(e.target.value)}
                sx={styleTextField}
            />
            <TextField
                required
                error={Boolean(errorProtein)}
                helperText={errorProtein}
                label="Proteína"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                sx={styleTextField}
            />
            <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button
                    variant="contained"
                    onClick={handleAdd}
                    sx={styleButton}>
                    Adicionar
                </Button>
                <Button
                    variant="contained"
                    onClick={handleClear}
                    sx={styleButton}>
                        Limpar
                </Button>
            </Container>
        </Container>
    );
}

export default InsertFruit
