import {Grid } from '@mui/material';
import alchemy  from './Api.js'
import { useEffect, useState } from 'react';


function Block (){
    const client = alchemy;
    const [block, setBlock] = useState(null);

    useEffect(() => {
        const getBlock = async () => {
            const blockNumber = await client.core.getBlockNumber();
            const block_ = await client.core.getBlock(blockNumber);
            console.log(block_);
            setBlock(block_);
        };

        getBlock();
    }, []);

    return (
       <Grid container>
            <Grid size={8}>{
                block ? JSON.stringify(block) : "Loading..."
            }</Grid>

       </Grid >
    );
}

export default Block;