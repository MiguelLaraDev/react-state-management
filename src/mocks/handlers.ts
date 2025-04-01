import { http, HttpResponse } from 'msw';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface LoginResponse {
  token: string;
}

export const handlers = [
  // Mock a GET request
  http.get('/api/user', () => {
    const mockUser: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
    };
    
    return HttpResponse.json(mockUser, { status: 200 });
  }),

  // Mock a POST request
  http.post('/api/login', async ({ request }) => {

    console.log(request)
    // You can access the request body if needed
    // const body = await request.json();
    
    const response: LoginResponse = {
      token: 'mock-token',
    };
    
    return HttpResponse.json(response, { status: 200 });
  }),
];