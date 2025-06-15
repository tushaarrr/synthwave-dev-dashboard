
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

    const prompt = `You are a senior technical architect and startup advisor. Generate a comprehensive BUT REALISTIC MVP development blueprint for a 2-member team starting with $300-500 budget.

Input:
- Project Name: ${finalProjectName}
- Description: ${finalDescription}
- Requirements: ${finalRequirements}

Return ONLY valid JSON with this EXACT structure. Be REALISTIC about bootstrap budget - focus on FREE/CHEAP tools, 6-8 core modules, 8-12 week timeline, and $500-1200 total budget for 2-member team:

{
  "product_scope": "Write 2-3 sentences defining the MVP scope. Focus on ONE core problem that can be solved with minimal budget.",
  "tech_stack": {
    "frontend": ["React 18", "TypeScript", "Tailwind CSS", "Vite"],
    "backend": ["Node.js", "Express", "Supabase (Free Tier)"],
    "hosting": ["Vercel (Free)", "Supabase (Free)"],
    "ai_services": ["OpenAI (Pay-per-use)"],
    "tools": ["GitHub (Free)", "VS Code (Free)", "Figma (Free)"],
    "testing": ["Jest", "React Testing Library", "Cypress (Free tier)"],
    "monitoring": ["Sentry (Free tier)", "Vercel Analytics"]
  },
  "modules": [
    {
      "name": "User Authentication & Authorization",
      "description": "Complete auth system with email/password, social login, role-based access control using Supabase Auth",
      "dependencies": ["Supabase Database", "Supabase Auth"],
      "ai_used": false,
      "estimated_hours": 16,
      "complexity": "Medium",
      "priority": "Critical"
    },
    {
      "name": "Core Dashboard & Navigation",
      "description": "Responsive main dashboard with navigation, user profile, notifications, and activity feeds",
      "dependencies": ["Authentication"],
      "ai_used": false,
      "estimated_hours": 20,
      "complexity": "Medium",
      "priority": "Critical"
    },
    {
      "name": "Primary Feature Module",
      "description": "The main value-adding feature that solves the core user problem with full CRUD operations",
      "dependencies": ["Authentication", "Dashboard"],
      "ai_used": false,
      "estimated_hours": 32,
      "complexity": "High",
      "priority": "Critical"
    },
    {
      "name": "Data Management System",
      "description": "Advanced CRUD operations with search, filtering, pagination, data validation, and export functionality",
      "dependencies": ["Authentication", "Database"],
      "ai_used": false,
      "estimated_hours": 28,
      "complexity": "High",
      "priority": "Critical"
    },
    {
      "name": "AI Integration & Processing",
      "description": "OpenAI API integration with prompt engineering, response processing, error handling, and usage tracking",
      "dependencies": ["Data Management", "OpenAI API"],
      "ai_used": true,
      "estimated_hours": 24,
      "complexity": "High",
      "priority": "Critical"
    },
    {
      "name": "User Settings & Preferences",
      "description": "Comprehensive user preferences, account management, subscription handling, and security settings",
      "dependencies": ["Authentication"],
      "ai_used": false,
      "estimated_hours": 14,
      "complexity": "Low",
      "priority": "Important"
    },
    {
      "name": "Notifications & Communication",
      "description": "In-app notifications, email alerts, and basic communication features",
      "dependencies": ["Authentication", "Dashboard"],
      "ai_used": false,
      "estimated_hours": 18,
      "complexity": "Medium",
      "priority": "Important"
    },
    {
      "name": "Analytics & Reporting",
      "description": "Basic usage analytics, user behavior tracking, and simple reporting dashboard",
      "dependencies": ["Data Management"],
      "ai_used": false,
      "estimated_hours": 22,
      "complexity": "Medium",
      "priority": "Nice-to-have"
    }
  ],
  "bonus_modules": [
    {
      "name": "Team Collaboration & Workspaces",
      "description": "Multi-user workspaces, team management, role assignments, and collaborative features (Phase 2)",
      "estimated_hours": 50,
      "cost_estimate": "$1,500"
    },
    {
      "name": "Advanced Analytics & Insights",
      "description": "Detailed charts, custom reports, data visualization, and business intelligence (Phase 2)",
      "estimated_hours": 40,
      "cost_estimate": "$1,200"
    },
    {
      "name": "Mobile Application",
      "description": "React Native mobile app with core features and offline capabilities (Phase 3)",
      "estimated_hours": 100,
      "cost_estimate": "$3,000"
    },
    {
      "name": "Third-party Integrations",
      "description": "APIs for Slack, Zapier, Google Workspace, and other popular tools (Phase 2)",
      "estimated_hours": 35,
      "cost_estimate": "$1,000"
    }
  ],
  "architecture": {
    "pattern": "Modular Monolith",
    "reason": "Perfect balance for 2-person team - organized code structure but simple deployment and debugging",
    "api_style": "REST with GraphQL consideration",
    "api_reason": "REST for simplicity, GraphQL for complex data fetching as the app grows",
    "database_type": "Supabase PostgreSQL with RLS",
    "database_reason": "Free tier includes auth, real-time, and row-level security - perfect for bootstrap",
    "deployment_strategy": "Vercel for frontend, Supabase for backend, GitHub Actions for CI/CD"
  },
  "testing_strategy": {
    "mvp_phase": {
      "types": ["Manual Testing", "Unit Tests", "Integration Tests"],
      "tools": {
        "manual": "Browser testing across devices",
        "unit": "Jest + React Testing Library",
        "integration": "Cypress (free tier)",
        "monitoring": "Sentry (free tier)"
      },
      "coverage_targets": {
        "manual": "100% of user workflows",
        "unit": "70% of utilities and hooks",
        "integration": "Critical user paths only"
      }
    },
    "growth_phase": {
      "types": ["Automated Testing", "Performance Testing", "Security Testing"],
      "tools": {
        "automation": "GitHub Actions CI/CD",
        "performance": "Lighthouse CI, Web Vitals",
        "security": "Snyk, OWASP scanning",
        "load": "Artillery.io (basic load testing)"
      },
      "coverage_targets": {
        "automated": "80% code coverage",
        "performance": "90+ Lighthouse scores",
        "security": "Zero critical vulnerabilities"
      }
    },
    "scale_phase": {
      "types": ["End-to-End Testing", "Stress Testing", "A/B Testing"],
      "tools": {
        "e2e": "Playwright or Cypress Cloud",
        "stress": "k6 or LoadRunner",
        "ab_testing": "PostHog or Optimizely",
        "monitoring": "DataDog or New Relic"
      },
      "coverage_targets": {
        "e2e": "100% critical business flows",
        "stress": "Handle 10x current load",
        "ab_testing": "Test all major features"
      }
    },
    "ai_testing": "Validate AI responses, test fallback scenarios, monitor API usage and costs",
    "testing_environments": ["Development", "Staging", "Production"],
    "automated_testing": "GitHub Actions with automated deployment on successful tests",
    "manual_testing": "2-person team testing + 10-15 beta users for feedback"
  },
  "timeline": [
    {
      "week": 1,
      "title": "Project Foundation",
      "tasks": ["Repository setup", "Development environment", "Supabase configuration", "Basic project structure"],
      "progress": 0,
      "deliverables": ["Working development setup", "Database schema", "Basic authentication"]
    },
    {
      "week": 2,
      "title": "Authentication & Security",
      "tasks": ["User registration/login", "Password reset", "Role-based access", "Security middleware"],
      "progress": 0,
      "deliverables": ["Complete auth system", "User management", "Security implementation"]
    },
    {
      "week": 3,
      "title": "Core Dashboard Development",
      "tasks": ["Main dashboard layout", "Navigation system", "User profile", "Responsive design"],
      "progress": 0,
      "deliverables": ["Functional dashboard", "Mobile-responsive UI", "User profile management"]
    },
    {
      "week": 4,
      "title": "Primary Feature Implementation",
      "tasks": ["Core feature development", "Business logic", "Data validation", "Error handling"],
      "progress": 0,
      "deliverables": ["Working primary feature", "Data validation", "Error handling"]
    },
    {
      "week": 5,
      "title": "Data Management System",
      "tasks": ["CRUD operations", "Search and filtering", "Data export", "Performance optimization"],
      "progress": 0,
      "deliverables": ["Complete data management", "Search functionality", "Export features"]
    },
    {
      "week": 6,
      "title": "AI Integration",
      "tasks": ["OpenAI API integration", "Prompt engineering", "Response processing", "Usage tracking"],
      "progress": 0,
      "deliverables": ["Working AI features", "Cost monitoring", "Response optimization"]
    },
    {
      "week": 7,
      "title": "User Experience & Settings",
      "tasks": ["User preferences", "Notifications", "Settings management", "Accessibility"],
      "progress": 0,
      "deliverables": ["User settings", "Notification system", "Accessibility compliance"]
    },
    {
      "week": 8,
      "title": "Testing & Quality Assurance",
      "tasks": ["Unit testing", "Integration testing", "Bug fixes", "Performance optimization"],
      "progress": 0,
      "deliverables": ["Test coverage", "Bug-free core features", "Performance benchmarks"]
    },
    {
      "week": 9,
      "title": "Analytics & Monitoring",
      "tasks": ["Usage analytics", "Error monitoring", "Performance tracking", "User feedback system"],
      "progress": 0,
      "deliverables": ["Analytics dashboard", "Monitoring setup", "Feedback collection"]
    },
    {
      "week": 10,
      "title": "Final Polish & Documentation",
      "tasks": ["UI polish", "Documentation", "User onboarding", "Final testing"],
      "progress": 0,
      "deliverables": ["Polished UI", "Complete documentation", "User guides"]
    },
    {
      "week": 11,
      "title": "Deployment & Launch Prep",
      "tasks": ["Production deployment", "Domain setup", "SSL certificates", "Backup systems"],
      "progress": 0,
      "deliverables": ["Production environment", "Launch checklist", "Backup procedures"]
    },
    {
      "week": 12,
      "title": "Launch & Post-Launch",
      "tasks": ["Soft launch", "User feedback", "Bug fixes", "Performance monitoring"],
      "progress": 0,
      "deliverables": ["Live application", "User feedback analysis", "Post-launch improvements"]
    }
  ],
  "team_plan": {
    "roles": [
      {
        "role": "Lead Full-Stack Developer",
        "responsibilities": "Backend architecture, API development, database design, DevOps, team coordination",
        "experience_level": "Senior (3+ years)",
        "time_commitment": "30-35 hours/week",
        "estimated_cost": "$0 (co-founder equity)",
        "key_skills": ["Node.js", "React", "PostgreSQL", "System Architecture", "DevOps"]
      },
      {
        "role": "Frontend Developer & UX Designer",
        "responsibilities": "UI/UX design, frontend development, user testing, responsive design, branding",
        "experience_level": "Mid-level (2+ years)",
        "time_commitment": "25-30 hours/week",
        "estimated_cost": "$0 (co-founder equity)",
        "key_skills": ["React", "TypeScript", "Tailwind CSS", "UI/UX Design", "User Testing"]
      }
    ],
    "team_size": "2 co-founders",
    "duration": "12 weeks (3 months)",
    "working_methodology": "Agile with 2-week sprints, daily standups, and weekly retrospectives",
    "communication_tools": ["Slack (Free)", "GitHub Issues", "Figma (Free)", "Google Meet (Free)"]
  },
  "budget_estimate": {
    "development": {
      "team_cost": "$0 (co-founder equity split)",
      "duration": "12 weeks (3 months)",
      "total": "$0"
    },
    "infrastructure": {
      "hosting": "$0/month (Vercel free tier)",
      "database": "$0/month (Supabase free tier)",
      "ai_services": "$30-80/month (OpenAI API usage)",
      "domain": "$15/year",
      "monitoring": "$0/month (free tiers)",
      "total_monthly": "$30-80/month"
    },
    "one_time_costs": {
      "domain_registration": "$15",
      "design_tools": "$0 (free tiers)",
      "development_tools": "$0 (free/open source)",
      "initial_ai_credits": "$100",
      "legal_setup": "$200 (basic LLC setup)",
      "total": "$315"
    },
    "total_mvp": "$500-800 (including 6 months of operations)",
    "post_mvp_monthly": "$30-100/month",
    "scaling_costs": "Expect $200-500/month when you reach 1000+ users"
  },
  "suggestions": [
    "Start with free tiers and open-source tools - upgrade only when necessary",
    "Focus on ONE core feature that solves a real problem effectively",
    "Get user feedback early and often (after week 6)",
    "Implement proper error handling and monitoring from day one",
    "Document your API and code thoroughly for easier team collaboration",
    "Plan for monetization strategy during development (weeks 8-10)",
    "Create a simple landing page before full development to validate demand",
    "Use GitHub Projects for task management and progress tracking",
    "Set up automated testing pipeline early to prevent technical debt"
  ]
}

This is for a 2-person BOOTSTRAP startup with $500-800 budget. Include comprehensive testing for all phases.`;

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
