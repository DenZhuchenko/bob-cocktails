import {Box, Button} from "@chakra-ui/react";

const SumPrise = (props) => {
    const {items} = props
    if (items) {
        let sumArr = items.map(el =>
            el.count * (el.id.substring(0, 2) - 7)
        )
        return <Box
            border={"2px solid green"}
            borderRadius={'5px'}
            p={'25px'}
        >
            Total:
            {sumArr.reduce((sum, elem) => sum + elem, 0)}$
            <Button
                ml={'2rem'}
                bg={'green.100'}
            >Buy now
            </Button>
        </Box>
    } else return <div>Error</div>
}

export default SumPrise