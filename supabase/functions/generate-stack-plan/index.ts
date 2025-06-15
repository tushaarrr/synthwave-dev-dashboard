
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

Return ONLY valid JSON with this EXACT structure. Be REALISTIC about bootstrap budget - focus on FREE/CHEAP tools, 6-8 core modules, 10-12 week timeline, and $500-1200 total budget for 2-member team:

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
      },
      "focus": "Core functionality and user experience",
      "budget": "$0 (team testing + 5-10 beta users)",
      "timeline": "Weeks 8-10"
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
      },
      "focus": "Stability and scalability preparation",
      "budget": "$50-100/month for advanced testing tools",
      "timeline": "Weeks 13-16"
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
      },
      "focus": "Enterprise readiness and optimization",
      "budget": "$200-500/month for enterprise testing",
      "timeline": "Weeks 17+"
    },
    "ai_testing": "Validate AI responses, test fallback scenarios, monitor API usage and costs, implement response caching",
    "testing_environments": ["Development", "Staging", "Production"],
    "automated_testing": "GitHub Actions with automated deployment on successful tests",
    "manual_testing": "2-person team testing + 10-15 beta users for feedback"
  },
  "timeline": [
    {
      "week": 1,
      "title": "Project Foundation & Setup",
      "tasks": ["Repository setup", "Development environment", "Supabase configuration", "Basic project structure", "Domain registration"],
      "progress": 0,
      "deliverables": ["Working development setup", "Database schema", "Basic authentication flow"],
      "team_focus": "Both developers on infrastructure"
    },
    {
      "week": 2,
      "title": "Authentication & Security",
      "tasks": ["User registration/login", "Password reset", "Role-based access", "Security middleware", "Email templates"],
      "progress": 0,
      "deliverables": ["Complete auth system", "User management", "Security implementation"],
      "team_focus": "Backend dev on auth, Frontend dev on UI components"
    },
    {
      "week": 3,
      "title": "Core Dashboard Development",
      "tasks": ["Main dashboard layout", "Navigation system", "User profile", "Responsive design", "Basic styling"],
      "progress": 0,
      "deliverables": ["Functional dashboard", "Mobile-responsive UI", "User profile management"],
      "team_focus": "Frontend dev leads, Backend dev on API endpoints"
    },
    {
      "week": 4,
      "title": "Primary Feature Implementation - Part 1",
      "tasks": ["Core feature backend", "API design", "Database models", "Business logic", "Data validation"],
      "progress": 0,
      "deliverables": ["Backend for main feature", "API documentation", "Data models"],
      "team_focus": "Backend dev leads, Frontend dev on component planning"
    },
    {
      "week": 5,
      "title": "Primary Feature Implementation - Part 2", 
      "tasks": ["Frontend for core feature", "User interface", "Form handling", "State management", "Error handling"],
      "progress": 0,
      "deliverables": ["Working primary feature", "User-friendly interface", "Error handling"],
      "team_focus": "Frontend dev leads, Backend dev on optimization"
    },
    {
      "week": 6,
      "title": "Data Management System",
      "tasks": ["CRUD operations", "Search and filtering", "Data export", "Performance optimization", "Pagination"],
      "progress": 0,
      "deliverables": ["Complete data management", "Search functionality", "Export features"],
      "team_focus": "Both developers collaborate on complex queries"
    },
    {
      "week": 7,
      "title": "AI Integration & Processing",
      "tasks": ["OpenAI API integration", "Prompt engineering", "Response processing", "Usage tracking", "Cost monitoring"],
      "progress": 0,
      "deliverables": ["Working AI features", "Cost monitoring", "Response optimization"],
      "team_focus": "Backend dev on AI logic, Frontend dev on AI UI"
    },
    {
      "week": 8,
      "title": "User Experience & Settings",
      "tasks": ["User preferences", "Notifications", "Settings management", "Accessibility", "Performance optimization"],
      "progress": 0,
      "deliverables": ["User settings", "Notification system", "Accessibility compliance"],
      "team_focus": "Frontend dev on UX, Backend dev on notifications"
    },
    {
      "week": 9,
      "title": "Testing & Quality Assurance",
      "tasks": ["Unit testing", "Integration testing", "Manual testing", "Bug fixes", "Performance testing"],
      "progress": 0,
      "deliverables": ["Test coverage", "Bug-free core features", "Performance benchmarks"],
      "team_focus": "Both developers on testing and debugging"
    },
    {
      "week": 10,
      "title": "Analytics & Monitoring Setup",
      "tasks": ["Usage analytics", "Error monitoring", "Performance tracking", "User feedback system", "Dashboard metrics"],
      "progress": 0,
      "deliverables": ["Analytics dashboard", "Monitoring setup", "Feedback collection"],
      "team_focus": "Backend dev on analytics, Frontend dev on metrics UI"
    },
    {
      "week": 11,
      "title": "Final Polish & Documentation",
      "tasks": ["UI polish", "Documentation", "User onboarding", "Help system", "Final security review"],
      "progress": 0,
      "deliverables": ["Polished UI", "Complete documentation", "User guides"],
      "team_focus": "Frontend dev on polish, Backend dev on documentation"
    },
    {
      "week": 12,
      "title": "Deployment & Launch Preparation",
      "tasks": ["Production deployment", "Domain setup", "SSL certificates", "Backup systems", "Launch checklist"],
      "progress": 0,
      "deliverables": ["Production environment", "Launch checklist", "Backup procedures"],
      "team_focus": "Both developers on deployment and final testing"
    }
  ],
  "team_plan": {
    "roles": [
      {
        "role": "Lead Full-Stack Developer (Co-founder 1)",
        "responsibilities": "Backend architecture, API development, database design, DevOps, team coordination, security implementation",
        "experience_level": "Senior (3+ years)",
        "time_commitment": "30-35 hours/week",
        "estimated_cost": "$0 (co-founder equity)",
        "key_skills": ["Node.js", "React", "PostgreSQL", "System Architecture", "DevOps", "Security"],
        "weekly_focus": "Weeks 1-4: Infrastructure, Weeks 5-8: Backend logic, Weeks 9-12: Optimization"
      },
      {
        "role": "Frontend Developer & UX Designer (Co-founder 2)",
        "responsibilities": "UI/UX design, frontend development, user testing, responsive design, branding, user experience optimization",
        "experience_level": "Mid-level (2+ years)",
        "time_commitment": "25-30 hours/week",
        "estimated_cost": "$0 (co-founder equity)",
        "key_skills": ["React", "TypeScript", "Tailwind CSS", "UI/UX Design", "User Testing", "Responsive Design"],
        "weekly_focus": "Weeks 1-4: Design system, Weeks 5-8: Feature UI, Weeks 9-12: Polish & UX"
      }
    ],
    "team_size": "2 co-founders",
    "duration": "12 weeks (3 months)",
    "working_methodology": "Agile with 2-week sprints, daily standups (15 min), weekly retrospectives, and bi-weekly planning sessions",
    "communication_tools": ["Slack (Free)", "GitHub Issues & Projects", "Figma (Free)", "Google Meet (Free)", "Notion (Free)"],
    "collaboration_strategy": "Pair programming for complex features, code reviews for all PRs, shared responsibility for testing"
  },
  "budget_estimate": {
    "development": {
      "team_cost": "$0 (co-founder equity split 50/50)",
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
    "Set up automated testing pipeline early to prevent technical debt",
    "Consider a soft launch with limited users for initial feedback"
  ]
}

This is for a 2-person BOOTSTRAP startup with $500-800 budget. Include comprehensive testing for all phases and a realistic 12-week timeline.`;

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

    // Enhanced realistic bootstrap fallback with complete 12-week timeline
    const fallbackResult = {
      product_scope: finalDescription,
      tech_stack: {
        frontend: ["React 18", "TypeScript", "Tailwind CSS", "Vite"],
        backend: ["Node.js", "Express", "Supabase (Free Tier)"],
        hosting: ["Vercel (Free)", "Supabase (Free)"],
        ai_services: ["OpenAI (Pay-per-use)"],
        tools: ["GitHub (Free)", "VS Code (Free)", "Figma (Free)"],
        testing: ["Jest", "React Testing Library", "Cypress (Free tier)"],
        monitoring: ["Sentry (Free tier)", "Vercel Analytics"]
      },
      modules: [
        {
          name: "User Authentication & Profiles",
          description: "Email/password authentication with Google OAuth using Supabase Auth, user profiles, and role management",
          dependencies: ["Supabase Database", "Supabase Auth"],
          ai_used: false,
          estimated_hours: 16,
          complexity: "Medium",
          priority: "Critical"
        },
        {
          name: "Core Dashboard & Navigation", 
          description: "Responsive main dashboard with navigation, user interface, and basic layout components",
          dependencies: ["Authentication"],
          ai_used: false,
          estimated_hours: 20,
          complexity: "Medium",
          priority: "Critical"
        },
        {
          name: "Primary Feature Module",
          description: "The main value-adding feature that solves the core user problem with full CRUD operations",
          dependencies: ["Authentication", "Dashboard"],
          ai_used: false,
          estimated_hours: 32,
          complexity: "High",
          priority: "Critical"
        },
        {
          name: "Data Management System",
          description: "Advanced CRUD operations with search, filtering, pagination, and data validation",
          dependencies: ["Authentication", "Database"],
          ai_used: false,
          estimated_hours: 28,
          complexity: "High",
          priority: "Critical"
        },
        {
          name: "AI Integration & Processing",
          description: "OpenAI API integration with prompt engineering, response processing, and usage tracking",
          dependencies: ["Data Management", "OpenAI API"],
          ai_used: true,
          estimated_hours: 24,
          complexity: "High",
          priority: "Critical"
        },
        {
          name: "User Settings & Preferences",
          description: "User preferences, account management, and basic security settings",
          dependencies: ["Authentication"],
          ai_used: false,
          estimated_hours: 14,
          complexity: "Low",
          priority: "Important"
        },
        {
          name: "Notifications & Communication",
          description: "In-app notifications and basic communication features",
          dependencies: ["Authentication", "Dashboard"],
          ai_used: false,
          estimated_hours: 18,
          complexity: "Medium",
          priority: "Important"
        },
        {
          name: "Analytics & Reporting",
          description: "Basic usage analytics and simple reporting dashboard",
          dependencies: ["Data Management"],
          ai_used: false,
          estimated_hours: 22,
          complexity: "Medium",
          priority: "Nice-to-have"
        }
      ],
      bonus_modules: [
        {
          name: "Team Collaboration",
          description: "Multi-user workspaces and basic sharing (Phase 2)",
          estimated_hours: 50,
          cost_estimate: "$1,500"
        },
        {
          name: "Advanced Analytics",
          description: "Charts, reports, and data insights (Phase 2)",
          estimated_hours: 40,
          cost_estimate: "$1,200"
        },
        {
          name: "Mobile App",
          description: "React Native mobile version (Phase 3)",
          estimated_hours: 100,
          cost_estimate: "$3,000"
        },
        {
          name: "Third-party Integrations",
          description: "APIs for popular tools (Phase 2)",
          estimated_hours: 35,
          cost_estimate: "$1,000"
        }
      ],
      architecture: {
        pattern: "Modular Monolith",
        reason: "Perfect balance for 2-person team - organized code structure but simple deployment and debugging",
        api_style: "REST",
        api_reason: "Simple, well-documented, works perfectly with Supabase",
        database_type: "Supabase PostgreSQL with RLS",
        database_reason: "Free tier includes auth, database, and real-time features - perfect for bootstrap",
        deployment_strategy: "Vercel free tier for frontend, Supabase for backend, GitHub Actions for CI/CD"
      },
      testing_strategy: {
        mvp_phase: {
          types: ["Manual Testing", "Unit Tests", "Integration Tests"],
          tools: {
            manual: "Browser testing across devices",
            unit: "Jest + React Testing Library",
            integration: "Cypress (free tier)",
            monitoring: "Sentry (free tier)"
          },
          coverage_targets: {
            manual: "100% of user workflows",
            unit: "70% of utilities and hooks",
            integration: "Critical user paths only"
          },
          focus: "Core functionality and user experience",
          budget: "$0 (team testing + 5-10 beta users)",
          timeline: "Weeks 9-10"
        },
        growth_phase: {
          types: ["Automated Testing", "Performance Testing", "Security Testing"],
          tools: {
            automation: "GitHub Actions CI/CD",
            performance: "Lighthouse CI, Web Vitals",
            security: "Snyk, OWASP scanning",
            load: "Artillery.io (basic load testing)"
          },
          coverage_targets: {
            automated: "80% code coverage",
            performance: "90+ Lighthouse scores",
            security: "Zero critical vulnerabilities"
          },
          focus: "Stability and scalability preparation",
          budget: "$50-100/month for advanced testing tools",
          timeline: "Weeks 13-16"
        },
        scale_phase: {
          types: ["End-to-End Testing", "Stress Testing", "A/B Testing"],
          tools: {
            e2e: "Playwright or Cypress Cloud",
            stress: "k6 or LoadRunner",
            ab_testing: "PostHog or Optimizely",
            monitoring: "DataDog or New Relic"
          },
          coverage_targets: {
            e2e: "100% critical business flows",
            stress: "Handle 10x current load",
            ab_testing: "Test all major features"
          },
          focus: "Enterprise readiness and optimization",
          budget: "$200-500/month for enterprise testing",
          timeline: "Weeks 17+"
        },
        ai_testing: "Validate AI responses, test fallback scenarios, monitor API usage and costs, implement response caching",
        testing_environments: ["Development", "Staging", "Production"],
        automated_testing: "GitHub Actions with automated deployment on successful tests",
        manual_testing: "2-person team testing + 10-15 beta users for feedback"
      },
      timeline: [
        {
          week: 1,
          title: "Project Foundation & Setup",
          tasks: ["Repository setup", "Development environment", "Supabase configuration", "Basic project structure", "Domain registration"],
          progress: 0,
          deliverables: ["Working development setup", "Database schema", "Basic authentication flow"],
          team_focus: "Both developers on infrastructure"
        },
        {
          week: 2,
          title: "Authentication & Security",
          tasks: ["User registration/login", "Password reset", "Role-based access", "Security middleware", "Email templates"],
          progress: 0,
          deliverables: ["Complete auth system", "User management", "Security implementation"],
          team_focus: "Backend dev on auth, Frontend dev on UI components"
        },
        {
          week: 3,
          title: "Core Dashboard Development",
          tasks: ["Main dashboard layout", "Navigation system", "User profile", "Responsive design", "Basic styling"],
          progress: 0,
          deliverables: ["Functional dashboard", "Mobile-responsive UI", "User profile management"],
          team_focus: "Frontend dev leads, Backend dev on API endpoints"
        },
        {
          week: 4,
          title: "Primary Feature Implementation - Part 1",
          tasks: ["Core feature backend", "API design", "Database models", "Business logic", "Data validation"],
          progress: 0,
          deliverables: ["Backend for main feature", "API documentation", "Data models"],
          team_focus: "Backend dev leads, Frontend dev on component planning"
        },
        {
          week: 5,
          title: "Primary Feature Implementation - Part 2", 
          tasks: ["Frontend for core feature", "User interface", "Form handling", "State management", "Error handling"],
          progress: 0,
          deliverables: ["Working primary feature", "User-friendly interface", "Error handling"],
          team_focus: "Frontend dev leads, Backend dev on optimization"
        },
        {
          week: 6,
          title: "Data Management System",
          tasks: ["CRUD operations", "Search and filtering", "Data export", "Performance optimization", "Pagination"],
          progress: 0,
          deliverables: ["Complete data management", "Search functionality", "Export features"],
          team_focus: "Both developers collaborate on complex queries"
        },
        {
          week: 7,
          title: "AI Integration & Processing",
          tasks: ["OpenAI API integration", "Prompt engineering", "Response processing", "Usage tracking", "Cost monitoring"],
          progress: 0,
          deliverables: ["Working AI features", "Cost monitoring", "Response optimization"],
          team_focus: "Backend dev on AI logic, Frontend dev on AI UI"
        },
        {
          week: 8,
          title: "User Experience & Settings",
          tasks: ["User preferences", "Notifications", "Settings management", "Accessibility", "Performance optimization"],
          progress: 0,
          deliverables: ["User settings", "Notification system", "Accessibility compliance"],
          team_focus: "Frontend dev on UX, Backend dev on notifications"
        },
        {
          week: 9,
          title: "Testing & Quality Assurance",
          tasks: ["Unit testing", "Integration testing", "Manual testing", "Bug fixes", "Performance testing"],
          progress: 0,
          deliverables: ["Test coverage", "Bug-free core features", "Performance benchmarks"],
          team_focus: "Both developers on testing and debugging"
        },
        {
          week: 10,
          title: "Analytics & Monitoring Setup",
          tasks: ["Usage analytics", "Error monitoring", "Performance tracking", "User feedback system", "Dashboard metrics"],
          progress: 0,
          deliverables: ["Analytics dashboard", "Monitoring setup", "Feedback collection"],
          team_focus: "Backend dev on analytics, Frontend dev on metrics UI"
        },
        {
          week: 11,
          title: "Final Polish & Documentation",
          tasks: ["UI polish", "Documentation", "User onboarding", "Help system", "Final security review"],
          progress: 0,
          deliverables: ["Polished UI", "Complete documentation", "User guides"],
          team_focus: "Frontend dev on polish, Backend dev on documentation"
        },
        {
          week: 12,
          title: "Deployment & Launch Preparation",
          tasks: ["Production deployment", "Domain setup", "SSL certificates", "Backup systems", "Launch checklist"],
          progress: 0,
          deliverables: ["Production environment", "Launch checklist", "Backup procedures"],
          team_focus: "Both developers on deployment and final testing"
        }
      ],
      team_plan: {
        roles: [
          {
            role: "Lead Full-Stack Developer (Co-founder 1)",
            responsibilities: "Backend architecture, API development, database design, DevOps, team coordination, security implementation",
            experience_level: "Senior (3+ years)",
            time_commitment: "30-35 hours/week",
            estimated_cost: "$0 (co-founder equity)",
            key_skills: ["Node.js", "React", "PostgreSQL", "System Architecture", "DevOps", "Security"],
            weekly_focus: "Weeks 1-4: Infrastructure, Weeks 5-8: Backend logic, Weeks 9-12: Optimization"
          },
          {
            role: "Frontend Developer & UX Designer (Co-founder 2)",
            responsibilities: "UI/UX design, frontend development, user testing, responsive design, branding, user experience optimization",
            experience_level: "Mid-level (2+ years)",
            time_commitment: "25-30 hours/week",
            estimated_cost: "$0 (co-founder equity)",
            key_skills: ["React", "TypeScript", "Tailwind CSS", "UI/UX Design", "User Testing", "Responsive Design"],
            weekly_focus: "Weeks 1-4: Design system, Weeks 5-8: Feature UI, Weeks 9-12: Polish & UX"
          }
        ],
        team_size: "2 co-founders",
        duration: "12 weeks (3 months)",
        working_methodology: "Agile with 2-week sprints, daily standups (15 min), weekly retrospectives, and bi-weekly planning sessions",
        communication_tools: ["Slack (Free)", "GitHub Issues & Projects", "Figma (Free)", "Google Meet (Free)", "Notion (Free)"],
        collaboration_strategy: "Pair programming for complex features, code reviews for all PRs, shared responsibility for testing"
      },
      budget_estimate: {
        development: {
          team_cost: "$0 (co-founder equity split 50/50)",
          duration: "12 weeks (3 months)",
          total: "$0"
        },
        infrastructure: {
          hosting: "$0/month (Vercel free tier)",
          database: "$0/month (Supabase free tier)",
          ai_services: "$30-80/month (OpenAI API usage)",
          domain: "$15/year",
          monitoring: "$0/month (free tiers)",
          total_monthly: "$30-80/month"
        },
        one_time_costs: {
          domain_registration: "$15",
          design_tools: "$0 (free tiers)",
          development_tools: "$0 (free/open source)",
          initial_ai_credits: "$100",
          legal_setup: "$200 (basic LLC setup)",
          total: "$315"
        },
        total_mvp: "$500-800 (including 6 months of operations)",
        post_mvp_monthly: "$30-100/month",
        scaling_costs: "Expect $200-500/month when you reach 1000+ users"
      },
      suggestions: [
        "Start with free tiers and open-source tools - upgrade only when necessary",
        "Focus on ONE core feature that solves a real problem effectively",
        "Get user feedback early and often (after week 6)",
        "Implement proper error handling and monitoring from day one",
        "Document your API and code thoroughly for easier team collaboration",
        "Plan for monetization strategy during development (weeks 8-10)",
        "Create a simple landing page before full development to validate demand",
        "Use GitHub Projects for task management and progress tracking",
        "Set up automated testing pipeline early to prevent technical debt",
        "Consider a soft launch with limited users for initial feedback"
      ]
    };

    console.log('Using realistic bootstrap fallback data structure with complete timeline');
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
