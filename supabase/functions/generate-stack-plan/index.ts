
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

    const prompt = `You are a senior technical architect and product manager. Generate a comprehensive MVP development blueprint.

Input:
- Project Name: ${finalProjectName}
- Description: ${finalDescription}
- Requirements: ${finalRequirements}

Return ONLY valid JSON with this EXACT structure. Be realistic about MVP scope - focus on 4-6 core modules, 6-8 week timeline, and $8,000-15,000 budget:

{
  "product_scope": "Write 2-3 sentences defining the MVP scope. Focus on ONE core problem.",
  "tech_stack": {
    "frontend": ["React 18", "TypeScript", "Tailwind CSS", "Vite"],
    "backend": ["Node.js", "Express", "PostgreSQL"],
    "hosting": ["Vercel", "Supabase"],
    "ai_services": ["OpenAI GPT-4o-mini"]
  },
  "modules": [
    {
      "name": "User Authentication",
      "description": "Secure user registration and login system",
      "dependencies": ["Database", "Email Service"],
      "ai_used": false
    },
    {
      "name": "Dashboard & Navigation",
      "description": "Main user interface and navigation system",
      "dependencies": ["Authentication"],
      "ai_used": false
    },
    {
      "name": "Data Management",
      "description": "Core data processing and storage functionality",
      "dependencies": ["Authentication", "Database"],
      "ai_used": false
    },
    {
      "name": "AI-Powered Features",
      "description": "AI analysis and content generation capabilities",
      "dependencies": ["Data Management", "AI API"],
      "ai_used": true
    },
    {
      "name": "Reports & Analytics",
      "description": "Generate and view detailed reports and insights",
      "dependencies": ["AI Features", "Data Management"],
      "ai_used": true
    }
  ],
  "bonus_modules": [
    {
      "name": "Team Collaboration",
      "description": "Multi-user workspaces and sharing features"
    },
    {
      "name": "API Access",
      "description": "REST API for third-party integrations"
    }
  ],
  "architecture": {
    "pattern": "Modular Monolith",
    "reason": "Perfect for MVP - faster development, easier debugging, can scale to microservices later",
    "api_style": "REST",
    "api_reason": "Simple, well-understood, great tooling support",
    "database_type": "PostgreSQL",
    "database_reason": "ACID compliance, JSON support, excellent for complex queries",
    "deployment_strategy": "Container-based with CI/CD"
  },
  "testing_strategy": {
    "types": ["Unit Testing", "Integration Testing", "E2E Testing"],
    "tools": {
      "unit": "Jest + React Testing Library",
      "integration": "Supertest",
      "e2e": "Playwright"
    },
    "coverage_targets": {
      "unit": "80%",
      "integration": "70%",
      "critical_paths": "100%"
    },
    "ai_testing": "Test AI API integration, response validation, fallback scenarios, and cost monitoring",
    "testing_environments": ["Development", "Staging", "Production"],
    "automated_testing": "GitHub Actions CI/CD with automated test runs",
    "manual_testing": "User acceptance testing and cross-browser compatibility"
  },
  "timeline": [
    {
      "week": 1,
      "title": "Foundation Setup",
      "tasks": ["Project setup", "Authentication system", "Database design", "Basic UI components"],
      "progress": 0,
      "deliverables": ["Working auth", "Database schema", "UI framework"]
    },
    {
      "week": 2,
      "title": "Core Features",
      "tasks": ["Dashboard development", "Data management", "API endpoints", "User flows"],
      "progress": 0,
      "deliverables": ["Functional dashboard", "Data CRUD operations", "Core workflows"]
    },
    {
      "week": 3,
      "title": "AI Integration",
      "tasks": ["AI API integration", "Content generation", "Analysis features", "Response handling"],
      "progress": 0,
      "deliverables": ["Working AI features", "Content generation", "Analysis tools"]
    },
    {
      "week": 4,
      "title": "Reports & Analytics",
      "tasks": ["Report generation", "Data visualization", "Export features", "Performance optimization"],
      "progress": 0,
      "deliverables": ["Report system", "Charts/graphs", "Export functionality"]
    },
    {
      "week": 5,
      "title": "Testing & Polish",
      "tasks": ["Comprehensive testing", "Bug fixes", "UI/UX improvements", "Performance tuning"],
      "progress": 0,
      "deliverables": ["Tested application", "Bug-free core features", "Polished UI"]
    },
    {
      "week": 6,
      "title": "Launch Preparation",
      "tasks": ["Production deployment", "Documentation", "User onboarding", "Monitoring setup"],
      "progress": 0,
      "deliverables": ["Production app", "User docs", "Monitoring dashboard"]
    }
  ],
  "team_plan": {
    "roles": [
      {
        "role": "Full-Stack Developer (Lead)",
        "responsibilities": "Architecture, backend development, AI integration, deployment"
      },
      {
        "role": "Frontend Developer",
        "responsibilities": "UI/UX implementation, responsive design, user experience"
      },
      {
        "role": "Product Manager/Designer",
        "responsibilities": "Requirements, design, testing, project coordination"
      }
    ],
    "team_size": "3 people",
    "duration": "6 weeks"
  },
  "budget_estimate": {
    "development": {
      "team_cost": "$12,000 - $18,000",
      "duration": "6 weeks",
      "total": "$15,000"
    },
    "infrastructure": {
      "hosting": "$50/month",
      "ai_services": "$100/month",
      "third_party": "$50/month",
      "total_monthly": "$200/month"
    },
    "total_project": "$15,600 (including 3 months operations)"
  },
  "suggestions": [
    "Start with core MVP features before adding nice-to-haves",
    "Implement proper error handling and user feedback",
    "Focus on mobile-responsive design from day one",
    "Set up analytics and monitoring early for user insights",
    "Plan for scalability but don't over-engineer the MVP"
  ]
}

Make this realistic for an MVP. Focus on essential features only.`;

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
        
        // Ensure we have complete data structure
        const completeResult = {
          product_scope: parsedResult.product_scope || finalDescription,
          tech_stack: parsedResult.tech_stack || {
            frontend: ["React", "TypeScript", "Tailwind CSS"],
            backend: ["Node.js", "Express"],
            database: ["PostgreSQL"],
            hosting: ["Vercel", "Supabase"]
          },
          modules: parsedResult.modules || [],
          bonus_modules: parsedResult.bonus_modules || [],
          architecture: parsedResult.architecture || {},
          testing_strategy: parsedResult.testing_strategy || {},
          timeline: parsedResult.timeline || [],
          team_plan: parsedResult.team_plan || {},
          budget_estimate: parsedResult.budget_estimate || {},
          suggestions: parsedResult.suggestions || []
        };
        
        return new Response(JSON.stringify(completeResult), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response, using fallback');
    }

    // Enhanced fallback with complete realistic data
    const fallbackResult = {
      product_scope: finalDescription,
      tech_stack: {
        frontend: ["React 18", "TypeScript", "Tailwind CSS", "Vite"],
        backend: ["Node.js", "Express", "PostgreSQL"],
        hosting: ["Vercel", "Supabase"],
        ai_services: ["OpenAI GPT-4o-mini"]
      },
      modules: [
        {
          name: "User Authentication & Profiles",
          description: "Secure user registration, login, and profile management",
          dependencies: ["Database", "Email Service"],
          ai_used: false
        },
        {
          name: "Dashboard & Navigation",
          description: "Main application interface and navigation system",
          dependencies: ["Authentication"],
          ai_used: false
        },
        {
          name: "Data Management System",
          description: "Core data processing, storage, and validation",
          dependencies: ["Authentication", "Database"],
          ai_used: false
        },
        {
          name: "AI-Powered Analysis",
          description: "AI-driven insights and content generation",
          dependencies: ["Data Management", "AI API"],
          ai_used: true
        },
        {
          name: "Reports & Visualization",
          description: "Generate reports and data visualizations",
          dependencies: ["AI Analysis", "Data Management"],
          ai_used: true
        }
      ],
      bonus_modules: [
        {
          name: "Team Collaboration",
          description: "Multi-user workspaces and sharing capabilities"
        },
        {
          name: "API & Integrations",
          description: "REST API and third-party tool integrations"
        }
      ],
      architecture: {
        pattern: "Modular Monolith",
        reason: "Ideal for MVP development - faster iteration, easier debugging, clear module separation",
        api_style: "REST",
        api_reason: "Simple, well-understood, excellent tooling support",
        database_type: "PostgreSQL",
        database_reason: "ACID compliance, JSON support, powerful querying capabilities",
        deployment_strategy: "Container-based deployment with automated CI/CD"
      },
      testing_strategy: {
        types: ["Unit Testing", "Integration Testing", "End-to-End Testing"],
        tools: {
          unit: "Jest + React Testing Library",
          integration: "Supertest + Jest",
          e2e: "Playwright"
        },
        coverage_targets: {
          unit: "80%",
          integration: "70%",
          critical_paths: "100%"
        },
        ai_testing: "Test AI API integration, response validation, fallback scenarios, and usage monitoring",
        testing_environments: ["Development", "Staging", "Production"],
        automated_testing: "GitHub Actions CI/CD with test automation on every PR",
        manual_testing: "User acceptance testing and cross-browser compatibility"
      },
      timeline: [
        {
          week: 1,
          title: "Foundation & Setup",
          tasks: ["Project initialization", "Authentication system", "Database schema", "Basic UI components"],
          progress: 0,
          deliverables: ["Working authentication", "Database structure", "UI framework"]
        },
        {
          week: 2,
          title: "Core Features",
          tasks: ["Dashboard development", "Data management", "API endpoints", "User workflows"],
          progress: 0,
          deliverables: ["Functional dashboard", "Data CRUD operations", "Core user flows"]
        },
        {
          week: 3,
          title: "AI Integration",
          tasks: ["AI API integration", "Content generation", "Analysis features", "Error handling"],
          progress: 0,
          deliverables: ["Working AI features", "Content generation", "Analysis tools"]
        },
        {
          week: 4,
          title: "Reports & Analytics",
          tasks: ["Report generation", "Data visualization", "Export features", "Performance optimization"],
          progress: 0,
          deliverables: ["Report system", "Charts and graphs", "Export functionality"]
        },
        {
          week: 5,
          title: "Testing & Polish",
          tasks: ["Comprehensive testing", "Bug fixes", "UI improvements", "Performance tuning"],
          progress: 0,
          deliverables: ["Tested application", "Bug-free features", "Polished interface"]
        },
        {
          week: 6,
          title: "Launch Preparation",
          tasks: ["Production deployment", "Documentation", "User onboarding", "Monitoring setup"],
          progress: 0,
          deliverables: ["Live application", "User documentation", "Monitoring dashboard"]
        }
      ],
      team_plan: {
        roles: [
          {
            role: "Full-Stack Developer (Lead)",
            responsibilities: "System architecture, backend development, AI integration, deployment setup"
          },
          {
            role: "Frontend Developer",
            responsibilities: "UI/UX implementation, responsive design, user experience optimization"
          },
          {
            role: "Product Manager/Designer",
            responsibilities: "Requirements management, design, testing coordination, project management"
          }
        ],
        team_size: "3 people",
        duration: "6 weeks"
      },
      budget_estimate: {
        development: {
          team_cost: "$12,000 - $18,000",
          duration: "6 weeks",
          total: "$15,000"
        },
        infrastructure: {
          hosting: "$50/month",
          ai_services: "$100/month",
          third_party: "$50/month",
          total_monthly: "$200/month"
        },
        total_project: "$15,600 (including first 3 months operational costs)"
      },
      suggestions: [
        "Focus on MVP core features before adding enhancements",
        "Implement comprehensive error handling and user feedback",
        "Design mobile-first for better user experience",
        "Set up analytics early to track user behavior",
        "Plan for scalability but avoid over-engineering the MVP"
      ]
    };

    console.log('Using enhanced fallback data structure');
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
