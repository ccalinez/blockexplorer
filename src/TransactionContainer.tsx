
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useLoaderData} from "react-router-dom";


function TransactionContainer(){

    const {transactions} = useLoaderData() as { transactions: string []};

    return (
    <List 
      sx={{ 
           width: '100%', 
           bgcolor: 'background.paper',
           height: '100%', 
           overflowY: 'auto',
           padding: 0 // Evita que el padding del <ul> genere overflow extra
        }}
    
    >
      {transactions.map((txHash, index) => (
        <ListItem disablePadding key={txHash}> 
          {/* Usamos el Hash como key porque es único, mejor que el index */}
          <ListItemButton 
            component={Link} 
            to={`/tx/${txHash}`}
            sx={{ '&:hover': { bgcolor: 'action.hover' } }}
          >
            <ListItemIcon>
              <ReceiptLongIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary={`Transacción ${index + 1}`} 
              secondary={txHash} 
              primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
              secondaryTypographyProps={{ noWrap: true }} // Corta el hash si es muy largo
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default TransactionContainer;