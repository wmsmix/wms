export async function GET() {
  throw new Error('Server Error Test');
  
  return new Response('This will never be reached');
} 