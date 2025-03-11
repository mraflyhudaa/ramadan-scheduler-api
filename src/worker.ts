import app from './app';

export interface Env {
  // Add your environment variables here
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Create a mock express environment for the worker
    return await handleRequest(request, env);
  },
};

async function handleRequest(request: Request, env: Env): Promise<Response> {
  // Create a mock Node.js Request and Response to pass to Express
  const url = new URL(request.url);
  const method = request.method;
  const headers = Object.fromEntries(request.headers.entries());
  
  // Create a promise that will resolve with the response
  return new Promise((resolve) => {
    let responseBody = '';
    let statusCode = 200;
    let responseHeaders: Record<string, string> = {};
    
    // Create mock objects for Express
    const req: any = {
      method,
      url: url.pathname + url.search,
      headers,
      path: url.pathname,
      query: Object.fromEntries(url.searchParams),
      params: {},
      body: null,
    };
    
    const res: any = {
      statusCode: 200,
      headers: {},
      setHeader(key: string, value: string) {
        this.headers[key] = value;
        return this;
      },
      status(code: number) {
        statusCode = code;
        return this;
      },
      send(body: string) {
        responseBody = body;
        resolve(new Response(responseBody, {
          status: statusCode,
          headers: this.headers,
        }));
      },
      json(body: any) {
        responseBody = JSON.stringify(body);
        this.setHeader('Content-Type', 'application/json');
        resolve(new Response(responseBody, {
          status: statusCode,
          headers: this.headers,
        }));
      },
      end() {
        resolve(new Response(responseBody, {
          status: statusCode,
          headers: this.headers,
        }));
      }
    };
    
    // Parse the request body if it exists
    const processRequest = async () => {
      if (request.body) {
        const contentType = request.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          req.body = await request.json();
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
          const formData = await request.formData();
          req.body = Object.fromEntries(formData);
        }
      }
      
      // Pass the request to Express
      app(req, res);
    };
    
    processRequest();
  });
}