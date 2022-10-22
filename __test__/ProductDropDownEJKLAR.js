import { render, fireEvent, debug } from '@testing-library/react-native';
import ProductDropDown from '../components/elements/ProductDropDown';

let delivery = {};


let products =
    [
        { name: "Mutter M10", id: 28887 },
        { name: "Mutter M8", id: 28888 },
        { name: "Mutter M6", id: 28889 },
    ];

const setDelivery = (newDelivery) => {
    delivery = newDelivery;
}

let currentProduct = {};
const setCurrentProduct = (newCurrentProduct) => {
    currentProduct = newCurrentProduct;
}

const mockSubmit = jest.fn();
const navigation = () => false;

const setProducts = () => false;

test('testing Authfields for login', async () => {
    const title = "Logga in"

    const { getAllByText, getByTestId, debug } = render(
        <ProductDropDown
            delivery={delivery}
            setDelivery={setDelivery}
            setCurrentProduct={setCurrentProduct}
        />
    );

    //const titleElements = await getAllByText(title);

    debug("ProductDropDown component");

    //console.log(getAllByText);

    const pickerField = await getByTestId("picker");

    fireEvent(pickerField, 'onValueChange', '2');

    expect(pickerField).name.toEqual("Mutter M8");


    /*
    expect(titleElements.length).toBe(2);

    //Logga in med användardata
    const emailField = await getByTestId("email-field");
    const passwordField = await getByTestId("password-field")

    expect(emailField).toBeDefined();
    expect(passwordField).toBeDefined();

    const fakeEmail = "test1@test.se";
    fireEvent.changeText(emailField, fakeEmail);

    expect(auth?.email).toEqual(fakeEmail);

    submitButton = getByTestId("submitButton");
    fireEvent.press(submitButton)

    expect(mockSubmit).toHaveBeenCalled();

    //Skriva in en felaktig e-postadress

    const invalidEmail = "test.se"
    fireEvent.changeText(emailField, invalidEmail)

    //expect(showMessage).toHaveBeenCalled;


    const flashMessage = await getByTestId("flashMessage")
    console.log(flashMessage)

   */
    

});


