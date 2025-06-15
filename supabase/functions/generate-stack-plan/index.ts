
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

    const prompt = `You are a senior technical architect and startup advisor. Generate a comprehensive BUT REALISTIC MVP development blueprint for someone starting with $300-500 budget.

Input:
- Project Name: ${finalProjectName}
- Description: ${finalDescription}
- Requirements: ${finalRequirements}

Return ONLY valid JSON with this EXACT structure. Be REALISTIC about bootstrap budget - focus on FREE/CHEAP tools, 4-6 core modules, 6-10 week timeline, and $300-800 total budget:

{
  "product_scope": "Write 2-3 sentences defining the MVP scope. Focus on ONE core problem that can be solved with minimal budget.",
  "tech_stack": {
    "frontend": ["React 18", "TypeScript", "Tailwind CSS", "Vite"],
    "backend": ["Node.js", "Express", "Supabase (Free Tier)"],
    "hosting": ["Vercel (Free)", "Supabase (Free)"],
    "ai_services": ["OpenAI (Pay-per-use)"],
    "tools": ["GitHub (Free)", "VS Code (Free)", "Figma (Free)"]
  },
  "modules": [
    {
      "name": "User Authentication & Profiles",
      "description": "Simple email/password auth with basic user profiles using Supabase Auth",
      "dependencies": ["Supabase Database"],
      "ai_used": false,
      "estimated_hours": 12,
      "complexity": "Low",
      "priority": "Critical"
    },
    {
      "name": "Core Dashboard & Navigation",
      "description": "Main user interface with responsive navigation and basic dashboard layout",
      "dependencies": ["Authentication"],
      "ai_used": false,
      "estimated_hours": 16,
      "complexity": "Low",
      "priority": "Critical"
    },
    {
      "name": "Primary Feature Module",
      "description": "The main value-adding feature that solves the core user problem",
      "dependencies": ["Authentication", "Dashboard"],
      "ai_used": false,
      "estimated_hours": 24,
      "complexity": "Medium",
      "priority": "Critical"
    },
    {
      "name": "Data Management System",
      "description": "CRUD operations for core data with simple validation and storage",
      "dependencies": ["Authentication", "Database"],
      "ai_used": false,
      "estimated_hours": 20,
      "complexity": "Medium",
      "priority": "Critical"
    },
    {
      "name": "Basic AI Integration",
      "description": "Simple AI feature using OpenAI API with basic error handling",
      "dependencies": ["Data Management", "OpenAI API"],
      "ai_used": true,
      "estimated_hours": 18,
      "complexity": "Medium",
      "priority": "Important"
    },
    {
      "name": "User Settings & Preferences",
      "description": "Basic user preferences and account management features",
      "dependencies": ["Authentication"],
      "ai_used": false,
      "estimated_hours": 10,
      "complexity": "Low",
      "priority": "Important"
    }
  ],
  "bonus_modules": [
    {
      "name": "Team Collaboration",
      "description": "Multi-user workspaces and basic sharing (Phase 2)",
      "estimated_hours": 40,
      "cost_estimate": "$1,000"
    },
    {
      "name": "Advanced Analytics",
      "description": "Charts, reports, and data insights (Phase 2)",
      "estimated_hours": 32,
      "cost_estimate": "$800"
    },
    {
      "name": "Mobile App",
      "description": "React Native mobile version (Phase 3)",
      "estimated_hours": 80,
      "cost_estimate": "$2,000"
    }
  ],
  "architecture": {
    "pattern": "Simple Monolith",
    "reason": "Fastest and cheapest for MVP - no complex infrastructure needed, easy to debug and deploy",
    "api_style": "REST",
    "api_reason": "Simple, well-documented, works perfectly with Supabase",
    "database_type": "Supabase PostgreSQL",
    "database_reason": "Free tier includes auth, database, and real-time features - perfect for bootstrap",
    "deployment_strategy": "Vercel free tier for frontend, Supabase for backend"
  },
  "testing_strategy": {
    "types": ["Manual Testing", "Basic Unit Tests"],
    "tools": {
      "manual": "Browser testing and user feedback",
      "unit": "Jest (basic setup)",
      "monitoring": "Sentry (free tier)"
    },
    "coverage_targets": {
      "manual": "100% of user flows",
      "unit": "50% (focus on critical functions)",
      "integration": "Core features only"
    },
    "ai_testing": "Test AI API responses and error handling with small sample data",
    "testing_environments": ["Development", "Production"],
    "automated_testing": "GitHub Actions (free tier) for basic CI",
    "manual_testing": "Personal testing + 5-10 beta users for feedback"
  },
  "timeline": [
    {
      "week": 1,
      "title": "Foundation Setup",
      "tasks": ["Project setup", "Supabase configuration", "Basic auth", "Initial UI framework"],
      "progress": 0,
      "deliverables": ["Working auth system", "Basic app structure", "Database schema"]
    },
    {
      "week": 2,
      "title": "Core Authentication & Dashboard",
      "tasks": ["User registration/login", "Dashboard layout", "Navigation", "User profiles"],
      "progress": 0,
      "deliverables": ["Complete auth flow", "Main dashboard", "User management"]
    },
    {
      "week": 3,
      "title": "Primary Feature Development",
      "tasks": ["Main feature implementation", "Core user workflows", "Basic validation"],
      "progress": 0,
      "deliverables": ["Working primary feature", "User can accomplish main task"]
    },
    {
      "week": 4,
      "title": "Data Management",
      "tasks": ["CRUD operations", "Data validation", "Error handling", "Basic search"],
      "progress": 0,
      "deliverables": ["Full data management", "Reliable data operations"]
    },
    {
      "week": 5,
      "title": "AI Integration",
      "tasks": ["OpenAI API integration", "AI feature implementation", "Response handling"],
      "progress": 0,
      "deliverables": ["Working AI features", "Error handling for AI calls"]
    },
    {
      "week": 6,
      "title": "User Experience Polish",
      "tasks": ["UI improvements", "Mobile responsiveness", "Loading states", "Error messages"],
      "progress": 0,
      "deliverables": ["Polished UI", "Mobile-friendly design"]
    },
    {
      "week": 7,
      "title": "Testing & Bug Fixes",
      "tasks": ["Manual testing", "Bug fixes", "Performance optimization", "User feedback"],
      "progress": 0,
      "deliverables": ["Stable application", "Major bugs fixed"]
    },
    {
      "week": 8,
      "title": "Launch Preparation",
      "tasks": ["Final testing", "Documentation", "Deployment", "Monitoring setup"],
      "progress": 0,
      "deliverables": ["Production-ready MVP", "Launch checklist completed"]
    }
  ],
  "team_plan": {
    "roles": [
      {
        "role": "Solo Developer/Founder",
        "responsibilities": "Full-stack development, design, testing, deployment, and product management",
        "experience_level": "Intermediate",
        "time_commitment": "20-30 hours/week",
        "estimated_cost": "$0 (sweat equity)",
        "key_skills": ["React", "JavaScript", "Basic design", "Problem-solving"]
      }
    ],
    "team_size": "1 person (solo founder)",
    "duration": "8 weeks part-time",
    "working_methodology": "Agile approach with weekly milestones and daily progress tracking",
    "communication_tools": ["GitHub Issues", "Personal journal", "User feedback forms"]
  },
  "budget_estimate": {
    "development": {
      "team_cost": "$0 (solo founder sweat equity)",
      "duration": "8 weeks part-time",
      "total": "$0"
    },
    "infrastructure": {
      "hosting": "$0/month (Vercel free tier)",
      "database": "$0/month (Supabase free tier)",
      "ai_services": "$20-50/month (OpenAI API usage)",
      "domain": "$12/year (optional)",
      "monitoring": "$0/month (free tiers)",
      "total_monthly": "$20-50/month"
    },
    "one_time_costs": {
      "domain_registration": "$12",
      "design_tools": "$0 (free tiers)",
      "development_tools": "$0 (free/open source)",
      "initial_ai_credits": "$50",
      "total": "$62"
    },
    "total_mvp": "$300-500 (including 6 months of operations)",
    "post_mvp_monthly": "$20-50/month",
    "scaling_costs": "Expect $100-200/month when you reach 1000+ users"
  },
  "suggestions": [
    "Start with free tiers for everything - upgrade only when necessary",
    "Focus on ONE core feature that solves a real problem",
    "Get user feedback early and often (after week 4)",
    "Keep the UI simple - prioritize functionality over fancy design",
    "Document your API and code from day one for easier scaling",
    "Plan for monetization from week 6 - even simple pricing helps validate demand",
    "Consider a simple landing page before full development to test interest"
  ]
}

This is for a BOOTSTRAP startup with $300-500 budget. Be extremely realistic about costs and complexity.`;

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
            database: ["Supabase (Free Tier)"],
            hosting: ["Vercel (Free)", "Supabase (Free)"]
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

    // Enhanced realistic bootstrap fallback
    const fallbackResult = {
      product_scope: finalDescription,
      tech_stack: {
        frontend: ["React 18", "TypeScript", "Tailwind CSS", "Vite"],
        backend: ["Node.js", "Express", "Supabase (Free Tier)"],
        hosting: ["Vercel (Free)", "Supabase (Free)"],
        ai_services: ["OpenAI (Pay-per-use)"],
        tools: ["GitHub (Free)", "VS Code (Free)", "Figma (Free)"]
      },
      modules: [
        {
          name: "User Authentication & Profiles",
          description: "Simple email/password auth with basic user profiles using Supabase Auth",
          dependencies: ["Supabase Database"],
          ai_used: false,
          estimated_hours: 12,
          complexity: "Low",
          priority: "Critical"
        },
        {
          name: "Core Dashboard & Navigation", 
          description: "Main user interface with responsive navigation and basic dashboard layout",
          dependencies: ["Authentication"],
          ai_used: false,
          estimated_hours: 16,
          complexity: "Low",
          priority: "Critical"
        },
        {
          name: "Primary Feature Module",
          description: "The main value-adding feature that solves the core user problem",
          dependencies: ["Authentication", "Dashboard"],
          ai_used: false,
          estimated_hours: 24,
          complexity: "Medium",
          priority: "Critical"
        },
        {
          name: "Data Management System",
          description: "CRUD operations for core data with simple validation and storage",
          dependencies: ["Authentication", "Database"],
          ai_used: false,
          estimated_hours: 20,
          complexity: "Medium",
          priority: "Critical"
        },
        {
          name: "Basic AI Integration",
          description: "Simple AI feature using OpenAI API with basic error handling",
          dependencies: ["Data Management", "OpenAI API"],
          ai_used: true,
          estimated_hours: 18,
          complexity: "Medium",
          priority: "Important"
        },
        {
          name: "User Settings & Preferences",
          description: "Basic user preferences and account management features",
          dependencies: ["Authentication"],
          ai_used: false,
          estimated_hours: 10,
          complexity: "Low",
          priority: "Important"
        }
      ],
      bonus_modules: [
        {
          name: "Team Collaboration",
          description: "Multi-user workspaces and basic sharing (Phase 2)",
          estimated_hours: 40,
          cost_estimate: "$1,000"
        },
        {
          name: "Advanced Analytics",
          description: "Charts, reports, and data insights (Phase 2)",
          estimated_hours: 32,
          cost_estimate: "$800"
        },
        {
          name: "Mobile App",
          description: "React Native mobile version (Phase 3)",
          estimated_hours: 80,
          cost_estimate: "$2,000"
        }
      ],
      architecture: {
        pattern: "Simple Monolith",
        reason: "Fastest and cheapest for MVP - no complex infrastructure needed, easy to debug and deploy",
        api_style: "REST",
        api_reason: "Simple, well-documented, works perfectly with Supabase",
        database_type: "Supabase PostgreSQL",
        database_reason: "Free tier includes auth, database, and real-time features - perfect for bootstrap",
        deployment_strategy: "Vercel free tier for frontend, Supabase for backend"
      },
      testing_strategy: {
        types: ["Manual Testing", "Basic Unit Tests"],
        tools: {
          manual: "Browser testing and user feedback",
          unit: "Jest (basic setup)",
          monitoring: "Sentry (free tier)"
        },
        coverage_targets: {
          manual: "100% of user flows",
          unit: "50% (focus on critical functions)",
          integration: "Core features only"
        },
        ai_testing: "Test AI API responses and error handling with small sample data",
        testing_environments: ["Development", "Production"],
        automated_testing: "GitHub Actions (free tier) for basic CI",
        manual_testing: "Personal testing + 5-10 beta users for feedback"
      },
      timeline: [
        {
          week: 1,
          title: "Foundation Setup",
          tasks: ["Project setup", "Supabase configuration", "Basic auth", "Initial UI framework"],
          progress: 0,
          deliverables: ["Working auth system", "Basic app structure", "Database schema"]
        },
        {
          week: 2,
          title: "Core Authentication & Dashboard",
          tasks: ["User registration/login", "Dashboard layout", "Navigation", "User profiles"],
          progress: 0,
          deliverables: ["Complete auth flow", "Main dashboard", "User management"]
        },
        {
          week: 3,
          title: "Primary Feature Development",
          tasks: ["Main feature implementation", "Core user workflows", "Basic validation"],
          progress: 0,
          deliverables: ["Working primary feature", "User can accomplish main task"]
        },
        {
          week: 4,
          title: "Data Management",
          tasks: ["CRUD operations", "Data validation", "Error handling", "Basic search"],
          progress: 0,
          deliverables: ["Full data management", "Reliable data operations"]
        },
        {
          week: 5,
          title: "AI Integration",
          tasks: ["OpenAI API integration", "AI feature implementation", "Response handling"],
          progress: 0,
          deliverables: ["Working AI features", "Error handling for AI calls"]
        },
        {
          week: 6,
          title: "User Experience Polish",
          tasks: ["UI improvements", "Mobile responsiveness", "Loading states", "Error messages"],
          progress: 0,
          deliverables: ["Polished UI", "Mobile-friendly design"]
        },
        {
          week: 7,
          title: "Testing & Bug Fixes",
          tasks: ["Manual testing", "Bug fixes", "Performance optimization", "User feedback"],
          progress: 0,
          deliverables: ["Stable application", "Major bugs fixed"]
        },
        {
          week: 8,
          title: "Launch Preparation",
          tasks: ["Final testing", "Documentation", "Deployment", "Monitoring setup"],
          progress: 0,
          deliverables: ["Production-ready MVP", "Launch checklist completed"]
        }
      ],
      team_plan: {
        roles: [
          {
            role: "Solo Developer/Founder",
            responsibilities: "Full-stack development, design, testing, deployment, and product management",
            experience_level: "Intermediate",
            time_commitment: "20-30 hours/week",
            estimated_cost: "$0 (sweat equity)",
            key_skills: ["React", "JavaScript", "Basic design", "Problem-solving"]
          }
        ],
        team_size: "1 person (solo founder)",
        duration: "8 weeks part-time",
        working_methodology: "Agile approach with weekly milestones and daily progress tracking",
        communication_tools: ["GitHub Issues", "Personal journal", "User feedback forms"]
      },
      budget_estimate: {
        development: {
          team_cost: "$0 (solo founder sweat equity)",
          duration: "8 weeks part-time",
          total: "$0"
        },
        infrastructure: {
          hosting: "$0/month (Vercel free tier)",
          database: "$0/month (Supabase free tier)",
          ai_services: "$20-50/month (OpenAI API usage)",
          domain: "$12/year (optional)",
          monitoring: "$0/month (free tiers)",
          total_monthly: "$20-50/month"
        },
        one_time_costs: {
          domain_registration: "$12",
          design_tools: "$0 (free tiers)",
          development_tools: "$0 (free/open source)",
          initial_ai_credits: "$50",
          total: "$62"
        },
        total_mvp: "$300-500 (including 6 months of operations)",
        post_mvp_monthly: "$20-50/month",
        scaling_costs: "Expect $100-200/month when you reach 1000+ users"
      },
      suggestions: [
        "Start with free tiers for everything - upgrade only when necessary",
        "Focus on ONE core feature that solves a real problem",
        "Get user feedback early and often (after week 4)",
        "Keep the UI simple - prioritize functionality over fancy design",
        "Document your API and code from day one for easier scaling",
        "Plan for monetization from week 6 - even simple pricing helps validate demand",
        "Consider a simple landing page before full development to test interest"
      ]
    };

    console.log('Using realistic bootstrap fallback data structure');
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
