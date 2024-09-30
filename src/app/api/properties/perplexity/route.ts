import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Handle POST requests
export async function POST(req: NextRequest) {
    const apiKey = process.env.PERPLEXITY_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    const messages = [
        {
            role: 'system',
            content: 'You are an artificial intelligence assistant...',
        },
        {
            role: 'user',
            content: 'How many stars are in the universe?',
        },
    ];

    try {
        const response = await axios.post(
            'https://api.perplexity.ai',  // base URL as used in your Jupyter notebook
            {
                model: 'llama-3.1-sonar-small-128k-online',
                messages: messages,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Perplexity API response:', response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Perplexity API error:', (error as any).response?.data || error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error('Unknown error:', error);
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}

// Optionally, if you want to handle GET requests too (for easier testing):
export async function GET(req: NextRequest) {
    return NextResponse.json({ message: 'Use POST request for this API' }, { status: 200 });
}

