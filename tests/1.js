import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://localhost:3000`;

const selector = 'li';

test('should add first placemark', async t => {
    await t
        .typeText('input[type=text]', 'First Placemark')
        .pressKey('enter')  // Добавляем метку
        .expect(Selector('input[type=text]').value).eql('')

        .expect(Selector(selector).nth(0).child('span').innerText).eql('First Placemark') // Существует ли метка?
        .click(Selector(selector).nth(0).child('span').nth(1)) // Удаляем метку
        .expect(Selector(selector).exists).notOk() // Проверяем, что метка удалена
});

test('should add 3 placemarks, drag third placemark and delete it', async t => {
    await t
        .typeText('input[type=text]', 'First Placemark')
        .pressKey('enter')
        .expect(Selector('input[type=text]').value).eql('')

        .typeText('input[type=text]', 'Second Placemark')
        .pressKey('enter')
        .expect(Selector('input[type=text]').value).eql('')

        .typeText('input[type=text]', 'Third Placemark')
        .pressKey('enter')
        .expect(Selector('input[type=text]').value).eql('')

        .expect(Selector(selector).nth(0).child('span').innerText).eql('First Placemark') // Есть ли метка #1
        .expect(Selector(selector).nth(1).child('span').innerText).eql('Second Placemark') // Есть ли метка #2
        .expect(Selector(selector).nth(2).child('span').innerText).eql('Third Placemark') // Есть ли метка #3

        .dragToElement(Selector(selector).nth(2), Selector(selector).nth(0), {speed: 0.1}) // Переместить третью метку

        .expect(Selector(selector).nth(0).child('span').innerText).eql('Third Placemark') // Есть ли метка #3
        .expect(Selector(selector).nth(1).child('span').innerText).eql('First Placemark') // Есть ли метка #1
        .expect(Selector(selector).nth(2).child('span').innerText).eql('Second Placemark') // Есть ли метка #2

        .click(Selector(selector).nth(0).child('span').nth(1)) // Удаляем Third Placemark

        .expect(Selector(selector).count).eql(2) // Проверяем, что всего 2 метки
        .expect(Selector(selector).nth(0).child('span').innerText).eql('First Placemark') // Есть ли метка #1
        .expect(Selector(selector).nth(1).child('span').innerText).eql('Second Placemark') // Есть ли метка #2
});