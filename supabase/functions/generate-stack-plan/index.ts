
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

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
    
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!anthropicApiKey) {
      throw new Error('Anthropic API key not configured');
    }

    const prompt = `You are an AI assistant helping developers plan and manage tech projects.

Input:
- Project Name: ${projectName}
- Description: ${projectDescription}
- Requirements: ${specificRequirements}

Your tasks:
- Recommend a suitable tech stack (Frontend, Backend, Database, Hosting)
- Create a 4-week development timeline with 1–2 tasks per week
- Structure the timeline as both a bullet list and a Gantt chart format (task, start, end)
- Provide 3 actionable suggestions to improve project delivery

Return a clean and structured output in the following sections:
1. Tech Stack
2. Timeline
3. Gantt Chart (as a table with Task, Start Date, End Date)
4. Suggestions`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${anthropicApiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;

    // Parse the AI response into sections
    const sections = aiResponse.split(/(?=\d\.\s)/);
    
    const techStack = sections.find(s => s.includes('Tech Stack'))?.replace(/^\d\.\s*Tech Stack\s*/, '') || '';
    const timeline = sections.find(s => s.includes('Timeline'))?.replace(/^\d\.\s*Timeline\s*/, '') || '';
    const ganttChart = sections.find(s => s.includes('Gantt Chart'))?.replace(/^\d\.\s*Gantt Chart[^:]*:?\s*/, '') || '';
    const suggestions = sections.find(s => s.includes('Suggestions'))?.replace(/^\d\.\s*Suggestions\s*/, '') || '';

    return new Response(JSON.stringify({
      techStack: techStack.trim(),
      timeline: timeline.trim(),
      ganttChart: ganttChart.trim(),
      suggestions: suggestions.trim(),
      fullResponse: aiResponse
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-stack-plan function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
