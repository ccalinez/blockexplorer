import { createPublicClient, http } from "viem"; 
import { mainnet } from "viem/chains";
 
const client = createPublicClient({
  chain: mainnet,
  transport: http("https://eth-mainnet.g.alchemy.com/v2/zNLNJXD_JwjwaubEpdjwa3-nDIZ6-VKR"),
});

export function getBlock( id ) {
  if(id){
    return client.getBlock(id);
  }else {
    return client.getBlock("latest");
  }
}

export function getTx(id) {
   return client.getTransactionReceipt({ 
      hash: id
    });
}

