import HttpClient from './axios_client';

let client: HttpClient;
beforeAll(async () => {
  client = new HttpClient('https://dog.ceo/api/breeds/image/', []);
});

describe('Testing Http Client using Axios', () => {
  it('Should return 200', async () => {
    const resp = await client.get('random');
    expect(resp).toHaveProperty('status', 200);
  });
});
