import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Forward the request to the backend API
    const backendResponse = await fetch('http://localhost:5000/api/chatbot/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await backendResponse.json()
    
    return NextResponse.json(data, { 
      status: backendResponse.status 
    })
    
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to connect to chatbot service' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Health check endpoint
    const backendResponse = await fetch('http://localhost:5000/api/chatbot/health', {
      method: 'GET',
    })

    const data = await backendResponse.json()
    
    return NextResponse.json(data, { 
      status: backendResponse.status 
    })
    
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      { 
        success: false, 
        chatbotService: 'unavailable',
        error: 'Failed to connect to chatbot service' 
      },
      { status: 503 }
    )
  }
}
