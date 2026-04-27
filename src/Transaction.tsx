import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useLoaderData } from "react-router-dom";

function Transaction(){
    const { tx } = useLoaderData() as { tx : any };


    return (
        <Card variant="outlined">{tx.from}</Card>
    );

}

export default Transaction;