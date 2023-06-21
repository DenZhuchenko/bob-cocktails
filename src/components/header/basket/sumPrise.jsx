import { Box, Button, useColorModeValue } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SumPrice = () => {
  const sumPrice = useSelector((state) => state.basket.sumPrice);

  return (
    <Box
      bg={useColorModeValue('white', 'gray.600')}
      color={useColorModeValue('gray.700', 'white')}
    >
      {sumPrice ? (
        <Box border={'2px solid green'} borderRadius={'5px'} p={'25px'}>
          Total: {sumPrice} $
          <NavLink to={'/payment'}>
            <Button ml={'2rem'} bg={'green.400'}>
              Buy now
            </Button>
          </NavLink>
        </Box>
      ) : null}
    </Box>
  );
};

export default SumPrice;
//
// import {Box, Button} from "@chakra-ui/react";
// import {NavLink} from "react-router-dom";
// import {useSelector} from "react-redux";
//
// const SumPrise = (props) => {
//
//
//     const sumPrice = useSelector(state => state.basket.sumPrice)
//
//
//     const {items} = props
//     if (items) {
//         let sumArr = items.map(el =>
//             el.count * (el.id.substring(0, 2) - 7)
//         )
//         return <Box
//             border={"2px solid green"}
//             borderRadius={'5px'}
//             p={'25px'}
//         >
//             Total:
//             {sumArr.reduce((sum, elem) => sum + elem, 0)}  $
//
//             <NavLink to={'/payment'}>
//                 <Button
//                     ml={'2rem'}
//                     bg={'green.100'}
//                 >Buy now
//                 </Button>
//             </NavLink>
//
//         </Box>
//     } else return <div>Error</div>
// }
//
// export default SumPrise
