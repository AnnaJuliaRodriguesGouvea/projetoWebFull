import Header from "./Header";
import Container from "@mui/material/Container";
import Introduction from "./Introduction";
import InputSearch from "./InputSearch";
import {Grid, Pagination} from "@mui/material";
import FruitCard from "./FruitCard";
import {createPortal} from "react-dom";
import InsertFruit from "./InsertFruit";
import React, {useContext} from "react";
import {AppContext} from "../App";

const Page = () => {
    const context = useContext(AppContext)

    return (
        <>
            <Header/>
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Introduction/>
                <InputSearch/>
            </Container>
            <Container sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginY: '2%'
            }}>
                <Grid container spacing={3}>
                    {context.fruits && context.fruits.map((fruit) => (
                        <FruitCard key={fruit.id} fruit={fruit}/>
                    ))}
                    {context.showInsertFruit && createPortal(
                        <InsertFruit/>,
                        document.body
                    )}
                </Grid>
            </Container>
            <Container sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginY: '2%'
            }}>
                <Pagination
                    count={context.pageCount}
                    page={context.page}
                    onChange={(event, newPage) => context.setPage(newPage)}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                />
            </Container>
        </>
    )
}

export default Page
