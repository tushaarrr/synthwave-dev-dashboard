
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

    const prompt = `You are a senior technical architect and product manager with 10+ years of experience building SaaS products. Generate a comprehensive, realistic MVP development blueprint that could actually be built by a small team.

Input:
- Project Name: ${finalProjectName}
- Description: ${finalDescription}
- Requirements: ${finalRequirements}

Create a detailed SaaS MVP blueprint with the following sections. Return ONLY valid JSON format:

{
  "product_scope": "Write 2-3 sentences defining the MVP scope. Focus on ONE core problem and target a specific user segment. Be realistic about what can be built in 4-6 weeks.",
  "tech_stack": {
    "frontend": ["React 18", "TypeScript", "Tailwind CSS", "Vite", "React Query"],
    "backend": ["Node.js", "Express", "TypeScript", "JWT Auth", "bcryptjs"],
    "database": ["PostgreSQL", "Prisma ORM", "Redis (sessions)"],
    "hosting": ["Vercel (Frontend)", "Railway/Render (Backend)", "Supabase (Database)"],
    "ai_services": ["OpenAI GPT-4o-mini"],
    "payments": ["Stripe Checkout"],
    "analytics": ["PostHog", "Sentry"],
    "development": ["ESLint", "Prettier", "Husky", "GitHub Actions"]
  },
  "modules": [
    {
      "name": "Authentication & User Management",
      "description": "Secure user registration, login, password management, and basic profile settings",
      "detailed_description": "Complete authentication flow including email/password signup with email verification, secure login with remember me functionality, password reset via email, basic user profile management with avatar upload, and session management. Includes rate limiting for security, password strength validation, and GDPR-compliant data handling. Users can update their profile information, change passwords, and delete their accounts.",
      "technical_details": "JWT tokens with 7-day expiry and refresh token rotation, bcrypt password hashing with salt rounds of 12, email verification using signed tokens with 24-hour expiry, Redis session store for logout tracking, rate limiting with express-rate-limit (5 attempts per 15 minutes for login), password validation with minimum 8 characters including numbers and special characters. Profile images stored in cloud storage with automatic resizing.",
      "dependencies": ["Database", "Email Service", "File Storage"],
      "ai_used": false,
      "complexity": "Medium",
      "estimated_hours": "35-50 hours",
      "key_features": ["Email/password auth", "Email verification", "Password reset", "Profile management", "Session handling"],
      "acceptance_criteria": ["User can register with email verification", "Secure login/logout functionality", "Password reset works via email", "Profile updates save correctly", "Sessions expire appropriately"]
    },
    {
      "name": "Core Dashboard & Navigation",
      "description": "Main application interface with responsive navigation, quick stats, and primary user workflows",
      "detailed_description": "Clean, intuitive dashboard serving as the central hub for all user activities. Features a responsive sidebar navigation, header with user menu, quick action buttons, and key metric cards. Includes search functionality across all data, notification center for important updates, and customizable dashboard widgets. Mobile-first design ensures excellent experience on all devices. Dashboard loads quickly with skeleton screens and progressive data loading.",
      "technical_details": "React components with TypeScript, responsive CSS Grid and Flexbox layouts, React Query for data fetching with automatic caching and background updates, skeleton loading states, lazy loading for performance, local storage for user preferences, debounced search with minimum 2 characters, infinite scrolling for large datasets, and keyboard shortcuts for power users (Ctrl+K for quick search).",
      "dependencies": ["Authentication", "Database", "API Layer"],
      "ai_used": false,
      "complexity": "High",
      "estimated_hours": "60-80 hours",
      "key_features": ["Responsive navigation", "Dashboard widgets", "Global search", "Notifications", "Quick actions"],
      "acceptance_criteria": ["Dashboard loads under 2 seconds", "Navigation works on mobile", "Search returns relevant results", "Widgets display real data", "Keyboard shortcuts function"]
    },
    {
      "name": "Data Management System",
      "description": "Robust system for importing, validating, and processing user data with comprehensive error handling",
      "detailed_description": "Enterprise-grade data import system supporting CSV, Excel, and JSON formats up to 10MB. Features intelligent column mapping with suggestions, data validation with detailed error reports, preview mode before final import, and batch processing for large files. Includes data transformation capabilities, duplicate detection and merging options, import history with rollback functionality, and comprehensive audit logs. Real-time progress tracking and email notifications for large imports.",
      "technical_details": "Multer for file uploads with virus scanning using ClamAV, Papa Parse for CSV processing, ExcelJS for Excel files, background job processing with Bull Queue and Redis, data validation using Joi schemas, progress tracking with WebSockets, file storage in S3-compatible storage, automatic data type detection, field mapping UI with drag-drop, and comprehensive error logging with Sentry integration.",
      "dependencies": ["Authentication", "Database", "File Storage", "Background Jobs", "Email Service"],
      "ai_used": true,
      "complexity": "High",
      "estimated_hours": "70-90 hours",
      "key_features": ["Multi-format support", "Data validation", "Progress tracking", "Error handling", "Import history"],
      "acceptance_criteria": ["Supports CSV/Excel/JSON files", "Validates data before import", "Shows import progress", "Handles errors gracefully", "Allows data preview"]
    },
    {
      "name": "AI-Powered Analysis Engine",
      "description": "Intelligent analysis and insights generation using OpenAI, providing actionable recommendations",
      "detailed_description": "Advanced AI system that analyzes user data to generate insights, summaries, and recommendations. Features intelligent prompt engineering for consistent results, response caching to reduce costs, usage tracking per user, and customizable analysis templates. Includes sentiment analysis, trend detection, automated report generation, and natural language explanations of complex data patterns. AI responses are formatted for easy consumption with charts and visualizations.",
      "technical_details": "OpenAI GPT-4o-mini integration with structured prompts, response caching using Redis with 24-hour TTL, token usage tracking per user with monthly limits, retry logic with exponential backoff, prompt templates for consistent outputs, response validation and sanitization, cost monitoring with alerts, A/B testing for prompt optimization, and structured JSON responses for data visualization.",
      "dependencies": ["Data Management", "Authentication", "External AI API", "Database"],
      "ai_used": true,
      "complexity": "High",
      "estimated_hours": "55-75 hours",
      "key_features": ["AI analysis", "Usage tracking", "Response caching", "Template system", "Cost management"],
      "acceptance_criteria": ["Generates accurate insights", "Tracks API usage", "Caches responses appropriately", "Handles API failures", "Stays within cost limits"]
    },
    {
      "name": "Subscription & Billing Management",
      "description": "Complete Stripe integration with subscription tiers, usage tracking, and payment management",
      "detailed_description": "Full-featured billing system with multiple subscription tiers (Free, Pro, Enterprise), usage-based billing for AI features, secure payment processing, and comprehensive subscription management. Includes trial periods, plan upgrades/downgrades with proration, payment method management, invoice generation, failed payment recovery, and detailed billing history. Supports discount codes, annual billing discounts, and team billing for multiple users.",
      "technical_details": "Stripe integration with webhooks for real-time updates, subscription lifecycle management, secure payment method storage, automatic invoice generation, dunning management for failed payments, proration calculations for plan changes, usage metering for AI features, tax calculation using Stripe Tax, PCI compliance with Stripe Elements, and automated email notifications for billing events.",
      "dependencies": ["Authentication", "Database", "Email Service", "External Payment API"],
      "ai_used": false,
      "complexity": "Medium",
      "estimated_hours": "45-65 hours",
      "key_features": ["Multiple plans", "Usage billing", "Payment methods", "Invoice generation", "Webhook handling"],
      "acceptance_criteria": ["Processes payments securely", "Handles plan changes", "Generates accurate invoices", "Manages failed payments", "Tracks usage correctly"]
    }
  ],
  "bonus_modules": [
    {
      "name": "Team Collaboration & Workspaces",
      "description": "Multi-user workspaces with role-based permissions, team member management, and shared resources for collaborative work"
    },
    {
      "name": "API Access & Developer Tools",
      "description": "RESTful API with authentication, comprehensive documentation, SDKs, and developer dashboard for advanced integrations"
    },
    {
      "name": "Advanced Analytics & Reporting",
      "description": "Custom report builder, scheduled reports, data export capabilities, and advanced visualization options"
    },
    {
      "name": "Third-Party Integrations Hub",
      "description": "Pre-built integrations with popular tools like Slack, Zapier, Google Workspace, and industry-specific platforms"
    }
  ],
  "architecture": {
    "pattern": "Modular Monolith",
    "reason": "A modular monolith provides the perfect balance for MVP development - faster iteration than microservices, easier debugging and deployment, while maintaining clear separation of concerns through well-defined modules. Can be gradually extracted to microservices as the product scales.",
    "api_style": "RESTful API",
    "api_reason": "REST APIs are simple to implement, have excellent tooling support, are well-understood by developers, and provide predictable endpoints. Perfect for MVP development with clear CRUD operations and standard HTTP methods.",
    "database_type": "PostgreSQL with Redis",
    "database_reason": "PostgreSQL provides ACID compliance, excellent JSON support for flexible schemas, robust indexing, and can handle complex queries. Redis handles sessions, caching, and background job queues for optimal performance.",
    "deployment_strategy": "Container-based deployment with CI/CD pipelines for automated testing and deployment"
  },
  "testing_strategy": {
    "types": ["unit", "integration", "end-to-end", "performance", "security"],
    "tools": {
      "unit": "Jest + React Testing Library",
      "integration": "Supertest + Jest",
      "end-to-end": "Playwright",
      "performance": "Lighthouse + K6",
      "security": "OWASP ZAP + Snyk"
    },
    "coverage_targets": {
      "unit": "80% minimum",
      "integration": "70% minimum",
      "critical_paths": "100% coverage"
    },
    "ai_testing": "Comprehensive testing of AI integration points including API response validation, fallback scenarios for API failures, token usage tracking accuracy, and response caching functionality",
    "testing_environments": ["Development", "Staging", "Production"],
    "automated_testing": "GitHub Actions CI/CD pipeline with automated test runs on every PR, performance monitoring, and security scans",
    "manual_testing": "User acceptance testing for critical workflows, usability testing with target users, and cross-browser compatibility testing"
  },
  "timeline": [
    {
      "week": 1,
      "title": "Foundation & Authentication",
      "tasks": ["Project setup & configuration", "Authentication system", "Database schema design", "Basic UI components", "CI/CD pipeline setup"],
      "progress": 0,
      "deliverables": ["Working auth system", "Database structure", "Basic UI framework"]
    },
    {
      "week": 2,
      "title": "Core Features Development",
      "tasks": ["Dashboard implementation", "Data import system", "API endpoints", "User management", "Basic testing setup"],
      "progress": 0,
      "deliverables": ["Functional dashboard", "Data import working", "Core API endpoints"]
    },
    {
      "week": 3,
      "title": "AI Integration & Advanced Features",
      "tasks": ["AI analysis engine", "Payment integration", "Data processing pipeline", "Performance optimization"],
      "progress": 0,
      "deliverables": ["AI features working", "Payment system live", "Optimized performance"]
    },
    {
      "week": 4,
      "title": "Testing & Launch Preparation",
      "tasks": ["Comprehensive testing", "Security review", "Performance optimization", "Documentation", "Production deployment"],
      "progress": 0,
      "deliverables": ["Tested MVP", "Security cleared", "Production ready"]
    }
  ],
  "team_plan": {
    "team_composition": {
      "total_size": "3-4 people",
      "duration": "4-6 weeks",
      "cost_range": "$12,000 - $20,000"
    },
    "roles": [
      {
        "role": "Full-Stack Developer (Lead)",
        "experience_level": "Senior (5+ years)",
        "responsibilities": ["Technical architecture decisions", "Backend API development", "Database design and optimization", "AI integration and prompt engineering", "Code reviews and quality assurance", "DevOps and deployment setup"],
        "time_commitment": "Full-time (40 hours/week)",
        "estimated_cost": "$6,000 - $10,000",
        "key_skills": ["Node.js/Express", "PostgreSQL", "OpenAI API", "AWS/Cloud services", "System design"]
      },
      {
        "role": "Frontend Developer",
        "experience_level": "Mid-level (3+ years)",
        "responsibilities": ["React component development", "UI/UX implementation", "Responsive design", "State management", "Frontend testing", "Performance optimization"],
        "time_commitment": "Full-time (40 hours/week)",
        "estimated_cost": "$4,000 - $7,000",
        "key_skills": ["React/TypeScript", "Tailwind CSS", "React Query", "Testing Library", "Responsive design"]
      },
      {
        "role": "Product Manager/Designer",
        "experience_level": "Mid-level (3+ years)",
        "responsibilities": ["Requirements gathering and prioritization", "User research and validation", "UI/UX design and wireframes", "Feature specification", "Testing coordination", "Launch planning and go-to-market"],
        "time_commitment": "Part-time (20 hours/week)",
        "estimated_cost": "$2,000 - $3,000",
        "key_skills": ["Product strategy", "User research", "Figma/Design tools", "Agile methodology", "Market analysis"]
      }
    ],
    "optional_roles": [
      {
        "role": "DevOps Engineer",
        "when_needed": "If team lacks deployment experience",
        "responsibilities": ["Infrastructure setup", "CI/CD pipeline", "Monitoring and logging"],
        "estimated_cost": "$1,000 - $2,000"
      }
    ],
    "working_methodology": "Agile development with 1-week sprints, daily standups, and weekly retrospectives",
    "communication_tools": ["Slack for daily communication", "GitHub for code collaboration", "Figma for design collaboration", "Linear/Jira for project management"]
  },
  "budget_estimate": {
    "development": {
      "team_cost": "$12,000 - $20,000 for MVP",
      "duration": "4-6 weeks",
      "breakdown": {
        "lead_developer": "$6,000 - $10,000 (4-6 weeks full-time)",
        "frontend_developer": "$4,000 - $7,000 (4-6 weeks full-time)",
        "pm_designer": "$2,000 - $3,000 (4-6 weeks part-time)"
      }
    },
    "infrastructure": {
      "hosting": "$50 - $150/month (Vercel Pro, Railway, Supabase)",
      "ai_services": "$100 - $300/month (OpenAI API usage)",
      "third_party": "$100 - $200/month (Stripe, email service, monitoring)",
      "total_monthly": "$250 - $650/month"
    },
    "one_time_costs": {
      "design_tools": "$200 - $500 (Figma, assets)",
      "development_tools": "$100 - $300 (monitoring, testing tools)",
      "legal": "$500 - $1,500 (terms of service, privacy policy)"
    },
    "total_mvp": "$13,000 - $22,000 including first 3 months operational costs",
    "post_mvp_monthly": "$250 - $650/month operational costs",
    "scaling_costs": "Expect 2-3x increase in infrastructure costs as you reach 1000+ active users"
  },
  "suggestions": [
    "Start with a laser-focused MVP that solves one specific problem exceptionally well rather than multiple problems poorly",
    "Implement comprehensive error tracking and user analytics from day one to understand how users interact with your product",
    "Build a robust testing strategy early - it's much harder to add comprehensive tests later",
    "Plan for AI costs carefully by implementing usage limits and monitoring from the start",
    "Focus on mobile-responsive design as 60%+ of users will likely access your SaaS on mobile devices",
    "Create an intuitive onboarding flow that demonstrates value within the first 2-3 minutes of use",
    "Implement feature flags for gradual rollouts and A/B testing of new functionality",
    "Set up proper monitoring and alerting to catch issues before they impact users",
    "Plan your database schema carefully upfront - migrations can be complex as you scale",
    "Consider implementing a feedback system early to guide future development priorities"
  ]
}

Make sure this is valid JSON and expand on the idea based on the project description provided. Adapt the modules, architecture, team composition, and testing strategy to fit the specific project type. Focus on realistic MVP scope, detailed technical implementation, and accurate cost estimates for a small but experienced team.`;

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
      techStack: '',
      timeline: '',
      ganttChart: '',
      suggestions: '',
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
