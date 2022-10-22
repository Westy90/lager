import { render, fireEvent, debug } from '@testing-library/react-native';
import TextFieldForm from '../components/elements/TextFieldForm';



let delivery = {};
const setDelivery = (newDelivery) => {
    delivery = newDelivery;
}
const mockSubmit = jest.fn();
const navigation = () => false;


test('testing TextfieldForm', async () => {

    const { getAllByText, getByTestId, debug } = render(<TextFieldForm
        delivery = {delivery}
        setDelivery = {setDelivery}
        />);
    //const titleElements = await getAllByText(title);

    const aComment = "Detta är en kommentar";
    const textField = await getByTestId("textField");
    fireEvent.changeText(textField, aComment)

    expect(delivery.comment).toEqual(aComment);

});


