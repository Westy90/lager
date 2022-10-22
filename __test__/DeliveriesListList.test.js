
import { render } from '@testing-library/react-native';
import DeliveriesListList from "../components/DeliveriesListList"

const currentDate = new Date().toLocaleDateString('se-SV');

const deliveries = [
    { product_name: "skruv", amount: 4, delivery_date: currentDate, comment: "test"},
    { product_name: "mutter", amount: 1, delivery_date: currentDate, comment: "test"},
    { product_name: "borr", amount: 2, delivery_date: currentDate, comment: "test"},
];

const setDeliveries = () => false;


test('List should contain three items', async () => {
    const { getByText } = render(<DeliveriesListList deliveries={deliveries} setDeliveries={setDeliveries} />);

    const skruv = await getByText('skruv', { exact: false });
    const mutter = await getByText('mutter', { exact: false });
    const borr = await getByText('borr', { exact: false });

    expect(skruv).toBeDefined();
    expect(mutter).toBeDefined();
    expect(borr).toBeDefined();

});


