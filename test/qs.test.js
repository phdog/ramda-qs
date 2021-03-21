import identity from 'ramda/es/identity';
import {qs} from '../lib';

const qParams1 = {page: '2', limit: '100', status: 'qa,done', asc: 'priority', ['created_at.lt']: '2021-03-10', ['created_at.gt']: '2021-03-01'};
const qString1 = '?page=2&limit=100&status=qa,done&asc=priority&created_at.lt=2021-03-10&created_at.gt=2021-03-01';


test('qs PARSE', () => {
  expect(
    qs().parse(qString1)
  ).toStrictEqual(
    qParams1
  );
});

test('qs STRINGIFY', () => {
  expect(
    qs().stringify(qParams1)
  ).toBe(
    qString1
  );
});

test('qs private ADD', () => {
  expect(
    qs()._add('status', 'done')({status: 'qa', asc: 'priority'})
  ).toStrictEqual(
    {status: 'done,qa', asc: 'priority'}
  );
  expect(
    qs()._add('status', 'done')({asc: 'priority'})
  ).toStrictEqual(
    {asc: 'priority', status: 'done'}
  );
});

test('qs private DROP', () => {
  expect(
    qs()._drop('status', 'done')({status: 'done,qa', asc: 'priority'})
  ).toStrictEqual(
    {status: 'qa', asc: 'priority'}
  );
  expect(
    qs()._drop('status', 'done')({status: 'done', asc: 'priority'})
  ).toStrictEqual(
    {asc: 'priority'}
  );
});

test('qs private SET', () => {
  expect(
    qs()._set('status', 'done')({status: 'qa', asc: 'priority'})
  ).toStrictEqual(
    {status: 'done', asc: 'priority'}
  );
  expect(
    qs()._set('status', '')({status: 'qa', asc: 'priority'})
  ).toStrictEqual(
    {asc: 'priority'}
  );
  expect(
    qs()._set('status', '')({status: 'qa'})
  ).toStrictEqual(
    {}
  );
});

test('qs private GET_KEY', () => {
  expect(
    qs()._getKey('status')({status: 'done,qa,in_progress', asc: 'priority'})
  ).toBe(
    'done,qa,in_progress'
  );
  expect(
    qs()._getKey('status')({asc: 'priority'})
  ).toBe(
    ''
  );
});

test('qs ADD', () => {
  expect(
    qs(() => '?status=qa&asc=priority', identity).add('status', 'done')
  ).toBe(
    '?status=done,qa&asc=priority'
  );
  expect(
    qs(() => '?asc=priority', identity).add('status', 'done')
  ).toBe(
    '?asc=priority&status=done'
  );
  expect(
    qs(() => '', identity).add('status', 'done')
  ).toBe(
    '?status=done'
  );
  expect(
    qs(() => '?status=%D0%BA_%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B5', identity).add('status', 'готово')
  ).toBe(
    '?status=%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BE,%D0%BA_%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B5'
  );
});


test('qs DROP', () => {
  expect(
    qs(() => '?status=qa,done,in_progress&asc=priority', identity).drop('status', 'done')
  ).toBe(
    '?status=qa,in_progress&asc=priority'
  );
  expect(
    qs(() => '?status=done&asc=priority', identity).drop('status', 'done')
  ).toBe(
    '?asc=priority'
  );
  expect(
    qs(() => '?status=%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BE%2C%D0%BA_%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B5&asc=priority', identity).drop('status', 'готово')
  ).toBe(
    '?status=%D0%BA_%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B5&asc=priority'
  );
});


test('qs SET', () => {
  expect(
    qs(() => '?status=qa,done,in_progress&asc=priority', identity).set('status', 'done')
  ).toBe(
    '?status=done&asc=priority'
  );
  expect(
    qs(() => '?status=qa,done,in_progress&asc=priority', identity).set('status', '')
  ).toBe(
    '?asc=priority'
  );
  expect(
    qs(() => '?status=qa,done,in_progress&asc=priority', identity).set('status', 'готово')
  ).toBe(
    '?status=%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BE&asc=priority'
  );
});

test('qs GET_KEY', () => {
  expect(
    qs(() => '?status=qa,done,in_progress&asc=priority').getKey('status')
  ).toBe(
    'qa,done,in_progress'
  );
  expect(
    qs(() => '?status=%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BE&asc=priority').getKey('status')
  ).toBe(
    'готово'
  );
  expect(
    qs(() => '?status=%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BE%2C%D0%BA_%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B5&asc=priority').getKey('status')
  ).toBe(
    'готово,к_проверке'
  );
  expect(
    qs(() => '?asc=priority').getKey('status')
  ).toBe(
    ''
  );
});

