import {Input} from "@chakra-ui/react";

const CardDateInput = () => {

    const cardDateHandler = (e) => {
        let targetLength = e.target.value.length
        const form = e.target.form

        if (targetLength === 2) {
            console.log(form)
            const index = [...form].indexOf(e.target)
            form.elements[index + 1].focus();
        }
    }


    return (
        <>
            <Input
                onChangeCapture={cardDateHandler}
                maxLength={2}
                textAlign={'center'}
                placeholder={'04'}
                size='xs'
                border={'none'}
                bgColor={'white'}
            />
            <Input
                onChangeCapture={cardDateHandler}
                border={'none'}
                maxLength={2}
                textAlign={'center'}
                placeholder={'24'}
                bgColor={'white'}
                size='xs'
            >

            </Input>
        </>
    )
}


const CardNumberInput = () => {

    const cardNumberHandler = (e) => {

        let targetLength = e.target.value.length
        const form = e.target.form

        if (targetLength === 4) {
            const index = [...form].indexOf(e.target);
            form.elements[index + 1].focus();
        }
    }
    }