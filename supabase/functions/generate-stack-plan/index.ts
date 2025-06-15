
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

    const prompt = `You are an AI assistant helping developers plan and manage SaaS projects. Generate a comprehensive development blueprint for an MVP (Minimum Viable Product).

Input:
- Project Name: ${finalProjectName}
- Description: ${finalDescription}
- Requirements: ${finalRequirements}

Create a detailed SaaS MVP blueprint with the following sections. Return ONLY valid JSON format:

{
  "product_scope": "Elaborate on the MVP scope - focus on core value proposition, primary target user, and the main problem being solved. Keep scope minimal but valuable.",
  "tech_stack": {
    "frontend": ["React", "TypeScript", "Tailwind CSS", "Vite"],
    "backend": ["Node.js", "Express", "JWT Auth"],
    "database": ["PostgreSQL", "Redis (caching)"],
    "hosting": ["Vercel (Frontend)", "Railway/Render (Backend)"],
    "ai_services": ["OpenAI API"],
    "payments": ["Stripe"],
    "analytics": ["Google Analytics"]
  },
  "modules": [
    {
      "name": "User Authentication & Onboarding",
      "description": "Complete user registration, login, password reset, and guided onboarding flow to get users started quickly",
      "detailed_description": "This module handles the entire user lifecycle from signup to first-time setup. Includes email verification, secure password handling with bcrypt, JWT token management, password reset flows, and a step-by-step onboarding process that guides new users through account setup and initial configuration. The onboarding should collect minimal required information and demonstrate core value immediately.",
      "technical_details": "JWT-based authentication with refresh tokens, bcrypt password hashing, email verification service, rate limiting for auth endpoints, session management, and responsive onboarding UI with progress indicators.",
      "dependencies": ["Database", "Email Service"],
      "ai_used": false,
      "complexity": "Medium",
      "estimated_hours": "40-60 hours"
    },
    {
      "name": "Core Dashboard & Analytics", 
      "description": "Main user interface with key metrics, data visualization, and primary workflow management",
      "detailed_description": "The central hub where users spend most of their time. Features a clean, intuitive dashboard with real-time data visualization using charts and graphs. Includes customizable widgets, filtering capabilities, search functionality, and responsive design that works on all devices. Should provide immediate value and clear next actions for users.",
      "technical_details": "React components with Recharts for visualizations, real-time updates via WebSocket or polling, responsive grid layout, lazy loading for performance, caching strategies, and keyboard shortcuts for power users.",
      "dependencies": ["User Auth", "Database", "API Layer"],
      "ai_used": false,
      "complexity": "High", 
      "estimated_hours": "80-120 hours"
    },
    {
      "name": "Data Import & Processing System",
      "description": "Secure file upload, data validation, processing pipeline, and error handling for user data",
      "detailed_description": "Robust system for handling various data formats (CSV, JSON, Excel) with intelligent parsing, validation, and error reporting. Includes file size limits, virus scanning, data transformation capabilities, preview functionality before import, and detailed error messages with suggestions for fixing data issues. Supports batch processing and background jobs for large datasets.",
      "technical_details": "File upload with drag-drop interface, server-side validation, background job processing with Redis, data transformation pipelines, progress tracking, error logging, and rollback capabilities for failed imports.",
      "dependencies": ["User Auth", "Database", "File Storage", "Background Jobs"],
      "ai_used": true,
      "complexity": "High",
      "estimated_hours": "60-90 hours"
    },
    {
      "name": "AI-Powered Core Feature",
      "description": "The main AI functionality that provides unique value - report generation, analysis, or intelligent automation",
      "detailed_description": "This is the star feature that differentiates your SaaS. Uses OpenAI API to provide intelligent analysis, content generation, or automated insights based on user data. Includes prompt engineering, response formatting, error handling for API failures, usage tracking for cost management, and user-friendly presentation of AI results. Should provide clear value and actionable insights.",
      "technical_details": "OpenAI API integration with retry logic, prompt templates, response caching, token usage tracking, rate limiting, error fallbacks, and structured output formatting. Includes A/B testing capabilities for prompt optimization.",
      "dependencies": ["User Auth", "Data Processing", "External AI API"],
      "ai_used": true,
      "complexity": "High",
      "estimated_hours": "70-100 hours"
    },
    {
      "name": "Payment & Subscription Management",
      "description": "Stripe integration for billing, subscription tiers, usage tracking, and payment failure handling",
      "detailed_description": "Complete billing system with multiple subscription tiers, usage-based billing options, payment method management, invoice generation, payment failure recovery, and subscription lifecycle management. Includes trial periods, proration for plan changes, webhook handling for payment events, and clear pricing display with tax calculations.",
      "technical_details": "Stripe integration with webhooks, subscription management, payment method storage, invoice generation, dunning management, tax calculation, PCI compliance, and automated billing notifications.",
      "dependencies": ["User Auth", "Database", "Email Service"],
      "ai_used": false,
      "complexity": "Medium",
      "estimated_hours": "50-70 hours"
    }
  ],
  "bonus_modules": [
    {
      "name": "API Access & Developer Tools",
      "description": "RESTful API with authentication, rate limiting, documentation, and developer dashboard for advanced users"
    },
    {
      "name": "Team Collaboration Features",
      "description": "Multi-user workspaces, role-based permissions, activity feeds, and shared resources for team plans"
    },
    {
      "name": "Advanced Integrations",
      "description": "Third-party integrations with popular tools like Slack, Zapier, Google Workspace, and industry-specific platforms"
    }
  ],
  "architecture": {
    "pattern": "Monolith",
    "reason": "For MVP development, a monolithic architecture allows faster iteration, simpler deployment, easier debugging, and reduced operational complexity. Can be refactored to microservices as the product scales.",
    "api_style": "REST",
    "api_reason": "REST APIs are simple to implement, well-understood by developers, have excellent tooling support, and easier to document and test. Perfect for MVP development.",
    "database_type": "PostgreSQL",
    "database_reason": "PostgreSQL provides ACID compliance for financial data, excellent JSON support for flexibility, strong ecosystem, and can handle the scale needed for early-stage SaaS."
  },
  "testing_strategy": {
    "types": ["unit", "integration", "e2e"],
    "tools": {
      "unit": "Jest + React Testing Library",
      "integration": "Supertest + Jest",
      "e2e": "Playwright"
    },
    "ai_testing": "Focus on testing AI integration points, API response handling, and fallback scenarios"
  },
  "timeline": [
    {
      "week": 1,
      "title": "Foundation & Setup",
      "tasks": ["Project setup & configuration", "Authentication system", "Database schema design", "Basic UI components"],
      "progress": 0
    },
    {
      "week": 2,
      "title": "Core Infrastructure", 
      "tasks": ["User dashboard", "Data import system", "API endpoints", "Payment integration setup"],
      "progress": 25
    },
    {
      "week": 3,
      "title": "AI Integration & Features",
      "tasks": ["AI feature implementation", "Data processing pipeline", "Error handling", "Basic analytics"],
      "progress": 50
    },
    {
      "week": 4,
      "title": "Polish & Launch Prep",
      "tasks": ["Testing & bug fixes", "Performance optimization", "Security review", "Production deployment"],
      "progress": 75
    }
  ],
  "team_plan": {
    "roles": [
      {
        "role": "Full-Stack Developer (Lead)",
        "responsibilities": "Architecture decisions, backend API development, database design, AI integration, deployment setup"
      },
      {
        "role": "Frontend Developer", 
        "responsibilities": "React components, UI/UX implementation, responsive design, user experience optimization"
      },
      {
        "role": "Product Manager/Designer (Part-time)",
        "responsibilities": "Requirements gathering, user research, design mockups, testing coordination, launch planning"
      }
    ],
    "team_size": "2-3 developers + 1 part-time PM",
    "duration": "4-6 weeks for MVP"
  },
  "budget_estimate": {
    "development": {
      "team_cost": "$8,000 - $15,000 for MVP",
      "duration": "4-6 weeks",
      "breakdown": {
        "lead_developer": "$4,000 - $7,500 (4-6 weeks @ $1,000-1,250/week)",
        "frontend_developer": "$3,000 - $6,000 (4-6 weeks @ $750-1,000/week)", 
        "pm_designer": "$1,000 - $1,500 (part-time design & coordination)"
      }
    },
    "infrastructure": {
      "hosting": "$25 - $100/month (Vercel Pro + Railway/Render)",
      "ai_services": "$50 - $200/month (OpenAI API usage)", 
      "third_party": "$50 - $150/month (Stripe, email service, analytics)",
      "total_monthly": "$125 - $450/month"
    },
    "total_mvp": "$8,500 - $17,000 including first 3 months operational costs",
    "post_mvp_monthly": "$125 - $450/month operational costs"
  },
  "suggestions": [
    "Start with a focused MVP that solves one core problem exceptionally well",
    "Implement user feedback collection from day one to guide development priorities",
    "Set up proper error tracking (Sentry) and analytics to understand user behavior",
    "Plan for AI costs by implementing usage tracking and rate limiting from the start",
    "Focus on mobile-responsive design as many users will access on mobile devices",
    "Create a simple onboarding flow that demonstrates value within 2 minutes",
    "Implement feature flags to enable gradual rollouts and A/B testing"
  ]
}

Make sure this is valid JSON and expand on the idea based on the project description provided. Adapt the modules, architecture, and suggestions to fit the specific project type. Focus on MVP scope and realistic costs for a small team.`;

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
