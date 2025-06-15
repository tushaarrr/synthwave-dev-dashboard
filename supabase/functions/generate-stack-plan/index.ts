
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectName, projectDescription, specificRequirements } = await req.json();
    
    console.log('Received request:', { projectName, projectDescription, specificRequirements });
    
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!anthropicApiKey) {
      console.error('Anthropic API key not found');
      throw new Error('Anthropic API key not configured');
    }

    console.log('API key found, making request to Anthropic...');

    // Use default idea if no input provided
    const defaultIdea = {
      projectName: "InvestorFlow AI",
      projectDescription: "SaaS tool that helps startups generate investor reports using AI-powered analytics and automated document generation",
      specificRequirements: "Report builder, Data import, AI summary writer, Investor dashboard"
    };

    const finalProjectName = projectName || defaultIdea.projectName;
    const finalDescription = projectDescription || defaultIdea.projectDescription;
    const finalRequirements = specificRequirements || defaultIdea.specificRequirements;

    const prompt = `You are an AI assistant helping developers plan and manage SaaS projects. Generate a comprehensive development blueprint.

Input:
- Project Name: ${finalProjectName}
- Description: ${finalDescription}
- Requirements: ${finalRequirements}

Create a detailed SaaS blueprint with the following sections. Return ONLY valid JSON format:

{
  "product_scope": "Elaborate on the product idea - expand into meaningful scope with core value proposition, target user, and problem being solved",
  "tech_stack": {
    "frontend": ["React", "TypeScript", "Tailwind CSS"],
    "backend": ["Node.js", "Express", "JWT"],
    "database": ["PostgreSQL", "Redis"],
    "hosting": ["Vercel", "Supabase"],
    "ai_services": ["OpenAI API", "Anthropic"],
    "payments": ["Stripe"],
    "analytics": ["PostHog"]
  },
  "modules": [
    {
      "name": "User Authentication",
      "description": "Secure user registration, login, and profile management",
      "dependencies": ["Database"],
      "ai_used": false
    },
    {
      "name": "AI Report Generator", 
      "description": "AI-powered report generation with custom templates",
      "dependencies": ["User Auth", "Data Import"],
      "ai_used": true
    }
  ],
  "bonus_modules": [
    {
      "name": "API Key System",
      "description": "Developer API access with rate limiting and usage tracking"
    },
    {
      "name": "Team Management",
      "description": "Multi-user workspaces with role-based permissions"
    }
  ],
  "architecture": {
    "pattern": "Monolith",
    "reason": "Faster initial development, easier deployment and debugging for MVP",
    "api_style": "REST",
    "api_reason": "Simpler to implement, better caching, wide tooling support",
    "database_type": "SQL",
    "database_reason": "Strong consistency for financial/business data, complex relationships"
  },
  "testing_strategy": {
    "types": ["unit", "integration", "e2e"],
    "tools": {
      "unit": "Jest",
      "integration": "Supertest",
      "e2e": "Playwright"
    },
    "ai_testing": "Use TestCaseGen for automated test case generation"
  },
  "timeline": [
    {
      "week": 1,
      "title": "Foundation Setup",
      "tasks": ["Project setup", "Authentication system", "Database schema"],
      "progress": 0
    },
    {
      "week": 2,
      "title": "Core Features",
      "tasks": ["User dashboard", "Data import system", "Basic API endpoints"],
      "progress": 25
    },
    {
      "week": 3,
      "title": "AI Integration", 
      "tasks": ["AI report generation", "Template system", "Export functionality"],
      "progress": 50
    },
    {
      "week": 4,
      "title": "Polish & Deploy",
      "tasks": ["Testing", "Performance optimization", "Production deployment"],
      "progress": 75
    }
  ],
  "team_plan": {
    "roles": [
      {
        "role": "Frontend Developer",
        "responsibilities": "UI/UX implementation, responsive design, state management"
      },
      {
        "role": "Backend Developer", 
        "responsibilities": "API development, database design, AI integration"
      },
      {
        "role": "DevOps Engineer",
        "responsibilities": "CI/CD setup, infrastructure management, monitoring"
      }
    ],
    "team_size": "2-3 developers",
    "duration": "3-6 months"
  },
  "budget_estimate": {
    "development": {
      "team_cost": "$15,000 - $30,000/month",
      "duration": "3-6 months",
      "total": "$45,000 - $180,000"
    },
    "infrastructure": {
      "hosting": "$100 - $500/month",
      "ai_services": "$200 - $1,000/month", 
      "third_party": "$150 - $400/month",
      "total_monthly": "$450 - $1,900/month"
    },
    "total_project": "$50,000 - $200,000"
  },
  "suggestions": [
    "Start with MVP focusing on core AI report generation feature",
    "Implement usage-based pricing to scale with customer value",
    "Set up proper error tracking and monitoring from day one",
    "Consider implementing caching for AI responses to reduce costs"
  ]
}

Make sure this is valid JSON and expand on the idea based on the project description provided. Adapt the modules, architecture, and suggestions to fit the specific project type.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${anthropicApiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': anthropicApiKey,
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      }),
    });

    console.log('Anthropic response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Anthropic response received successfully');
    
    const aiResponse = data.content[0].text;

    try {
      // Try to parse as JSON first
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedResult = JSON.parse(jsonMatch[0]);
        console.log('Parsed JSON result:', parsedResult);
        return new Response(JSON.stringify(parsedResult), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response, falling back to text parsing');
    }

    // Fallback to text parsing if JSON parsing fails
    const sections = aiResponse.split(/(?=\d\.\s)/);
    
    const techStack = sections.find(s => s.includes('Tech Stack'))?.replace(/^\d\.\s*Tech Stack\s*/, '') || '';
    const timeline = sections.find(s => s.includes('Timeline'))?.replace(/^\d\.\s*Timeline\s*/, '') || '';
    const ganttChart = sections.find(s => s.includes('Gantt Chart'))?.replace(/^\d\.\s*Gantt Chart[^:]*:?\s*/, '') || '';
    const suggestions = sections.find(s => s.includes('Suggestions'))?.replace(/^\d\.\s*Suggestions\s*/, '') || '';

    const fallbackResult = {
      product_scope: finalDescription,
      techStack: techStack.trim(),
      timeline: timeline.trim(),
      ganttChart: ganttChart.trim(),
      suggestions: suggestions.trim(),
      modules: [],
      bonus_modules: [],
      architecture: {},
      testing_strategy: {},
      team_plan: {},
      budget_estimate: {},
      fullResponse: aiResponse
    };

    console.log('Fallback result:', fallbackResult);

    return new Response(JSON.stringify(fallbackResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-stack-plan function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check the function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
