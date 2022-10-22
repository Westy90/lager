import { render, fireEvent, debug } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

let auth = {};
const setAuth = (newAuth) => {
    auth = newAuth;
}
const mockSubmit = jest.fn();
const navigation = () => false;


test('testing Authfields for login', async () => {
    const title = "Logga in"

    const { getAllByText, getByTestId, debug } = render(<AuthFields
        auth = {auth}
        setAuth = {setAuth}
        submit= {mockSubmit}
        title={title}
        navigation= {navigation}
        />);
    const titleElements = await getAllByText(title);

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

    /*
    const flashMessage = await getByTestId("flashMessage")
    console.log(flashMessage)
    */
    

});


