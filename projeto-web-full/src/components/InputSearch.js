import * as React from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import {
    Alert,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment, InputLabel,
    NativeSelect,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import {getFruits} from "../service/fruitService";

const InputSearch = () => {
    const context = useContext(AppContext)
    const [selectedRadio, setSelectedRadio] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selectedLimit, setSelectedLimit] = useState(6);
    const [error, setError] = useState(false)
    const [textError, setTextError] = useState("")
    // const [alertError, setAlertError] = useState(false)

    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectedLimit(event.target.value)
        context.setLimit(event.target.value)
        context.setPage(1)
    }

    const handleInputChange = (event) => {
        setSearchText(event.target.value.toLowerCase());
    };

    const handleSearch = async () => {
        context.setPage(1)
        await search()
    }

    const isValidFilters = () => {
        return !(selectedRadio === '' || searchText === '' || context.limit < 1 || context.page < 1)
    }

    const setResult = (result) => {
        if(result && result.status === 200) {
            if(result.data && result.data.rows) {
                context.setPageCount(result.data.pageCount)
                context.setFruits(result.data.rows)
            } else {
                context.setAlertError(true)
                context.setPageCount(1)
                context.setFruits([])
            }
        } else if (result && result.status === 204) {
            context.setAlertError(true)
            context.setPageCount(1)
            context.setFruits([])
        }
    }

    const clearError = () => {
        setError(false)
        context.setAlertError(false)
        setTextError("")
    }

    const search = async () => {
        if(isValidFilters()) {
            clearError()
            try {
                let filter = null
                switch (selectedRadio) {
                    case 'nome':
                        filter = "name"
                        break;
                    case 'genero':
                        filter = "genus"
                        break;
                    case 'familia':
                        filter = "family"
                        break;
                    case 'ordem':
                        filter = "order"
                        break;
                    default:
                        filter = null
                }

                let result = await getFruits(context.limit, context.page, filter, searchText)
                setResult(result)
            } catch (err) {
                if(err.data.toLowerCase().includes("token")) {
                    context.setAuthenticated(false)
                    localStorage.clear()
                } else {
                    setError(true)
                    setTextError(err.data)
                }
            }
        } else {
            setError(true)
            setTextError("Preencha os campos acima")
        }
    }

    useEffect(() => {
        (async () => {
            if(isValidFilters()) {
                await search()
            } else {
                try {
                    clearError()
                    let result = await getFruits(context.limit, context.page, null, null)

                    setResult(result)
                } catch (err) {
                    if(err.data.toLowerCase().includes("token")) {
                        context.setAuthenticated(false)
                        localStorage.clear()
                    } else {
                        setError(true)
                        setTextError(err.data)
                    }
                }
            }
        })()
    }, [context.page, context.limit]);

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignItems: 'center', margin: "2%" }}>
            <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={selectedRadio}
                    onChange={handleRadioChange}
                    sx={{ marginBottom: '1%'}}
                >
                    <FormControlLabel value="nome" control={<Radio />} label="Nome"/>
                    <FormControlLabel value="genero" control={<Radio />} label="Gênero"/>
                    <FormControlLabel value="familia" control={<Radio />} label="Família"/>
                    <FormControlLabel value="ordem" control={<Radio />} label="Ordem"/>
                </RadioGroup>
                <FormControl sx={{ marginBottom: '2%', width: '10%' }}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Itens Por Página
                    </InputLabel>
                    <NativeSelect
                        value={selectedLimit}
                        onChange={handleSelectChange}
                        inputProps={{
                            name: 'limit',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={6}>6</option>
                        <option value={12}>12</option>
                        <option value={18}>18</option>
                    </NativeSelect>
                </FormControl>
            </Container>
            <TextField
                error={error}
                helperText={textError}
                placeholder="Pesquisar..."
                value={searchText}
                onChange={handleInputChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleSearch}
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                sx={{ width: '45%' }}
            />
            {context.alertError ? (
                <Alert sx={{marginTop: '1%'}} severity="warning">Não foram encontrados dados para essa busca</Alert>
            ): null}
        </Container>
    );
}

export default InputSearch;
