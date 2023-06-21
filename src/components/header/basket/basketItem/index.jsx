import React, { useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Img,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  decrementProductInBasket,
  incrementProductInBasket,
  removeBasketItem,
  sumBasketPrice,
} from '../../../../store/basketSlice';
import { useDispatch } from 'react-redux';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

const BasketItem = (props) => {
  const { basketItems } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sumBasketPrice());
  }, []);

  const increment = (count, id) => {
    dispatch(incrementProductInBasket({ count, id }));
    dispatch(sumBasketPrice());
  };
  const decrement = (count, id) => {
    dispatch(decrementProductInBasket({ count, id }));
    dispatch(sumBasketPrice());
  };
  const remove = (id) => {
    dispatch(removeBasketItem(id));
    dispatch(sumBasketPrice());
  };

  const sumPricePerItemHandler = (count, price) => {
    const sum = count * price;
    const correct = sum % count === 0 && sum > 0;
    if (correct) {
      return sum + `$`;
    } else return <div>Error, smt strange was occurred</div>;
  };

  return (
    <Box>
      {basketItems.map((item) => (
        <Box
          key={item.id + Math.random()}
          display={'flex'}
          border={'1px solid black'}
          borderRadius={'5px'}
          boxSizing={'border-box'}
          justifyContent={'space-between'}
          p={'1em'}
          m={'1em'}
          w={'30rem'}
        >
          <Box justifyContent={'space-between'} alignContent={'space-between'}>
            {item.name}
            <NavLink to={`/cocktail/${item.id}`}>
              <Img
                src={item.image}
                alt={`product + ${item.name}`}
                height={'100px'}
                width={'100px'}
              />
            </NavLink>
          </Box>
          <Box>
            {item.count > 1 ? (
              <Button
                onClick={() => {
                  decrement(item.count, item.id);
                }}
                mr={'5px'}
              >
                -
              </Button>
            ) : (
              <Button mr={'5px'} disabled="disable">
                -
              </Button>
            )}
            {item.count}
            <Button
              ml={'5px'}
              onClick={() => {
                increment(item.count, item.id);
              }}
            >
              +
            </Button>

            <Popover placement="top" isLazy>
              <PopoverTrigger>
                <IconButton
                  ml={`3rem`}
                  aria-label="More server options"
                  icon={<SmallCloseIcon />}
                  variant="solid"
                  w="fit-content"
                />
              </PopoverTrigger>
              <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                <PopoverArrow />
                <PopoverBody>
                  <Stack>
                    <Button
                      onClick={() => {
                        remove(item.id);
                        console.log(`Remove from basket`);
                      }}
                      w="180px"
                      variant="ghost"
                      justifyContent="space-between"
                      fontWeight="normal"
                      colorScheme="red"
                      fontSize="sm"
                    >
                      Remove from basket
                    </Button>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Text>{sumPricePerItemHandler(item.count, item.price)}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default BasketItem;

{
  /* <div>*/
}
{
  /*    Price:*/
}
{
  /*    {item.id.substring(0, 2) - 7}$*/
}
{
  /* </div>*/
}
