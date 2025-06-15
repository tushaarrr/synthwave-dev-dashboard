
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface PromptAnalysis {
  score: number;
  grade: string;
  tags: string[];
  refinedPrompt: string;
  variations: {
    concise: string;
    creative: string;
    optimized: string;
  };
}

export const usePromptRefiner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PromptAnalysis | null>(null);
  const { user } = useAuth();

  const analyzePrompt = async (originalPrompt: string): Promise<PromptAnalysis> => {
    setIsLoading(true);
    
    try {
      // Simulate AI analysis - in real app would call Claude API
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock analysis based on prompt characteristics
      const wordCount = originalPrompt.split(' ').length;
      const hasContext = originalPrompt.includes('for') || originalPrompt.includes('using') || originalPrompt.includes('with');
      const hasSpecifics = originalPrompt.includes('React') || originalPrompt.includes('API') || originalPrompt.includes('database');
      const isVague = originalPrompt.includes('something') || originalPrompt.includes('anything') || wordCount < 10;
      
      let score = 5;
      const tags: string[] = [];
      
      if (wordCount < 8) {
        score -= 2;
        tags.push('Too brief');
      }
      if (!hasContext) {
        score -= 1;
        tags.push('Missing context');
      }
      if (!hasSpecifics) {
        score -= 1;
        tags.push('Too generic');
      }
      if (isVague) {
        score -= 2;
        tags.push('Unclear output');
      }
      if (wordCount > 100) {
        score -= 1;
        tags.push('Verbose');
      }
      if (hasContext && hasSpecifics && wordCount > 15 && wordCount < 60) {
        score += 2;
        tags.push('Well-structured');
      }

      score = Math.max(1, Math.min(10, score));
      
      const grade = score >= 8 ? 'Excellent' : score >= 6 ? 'Good' : score >= 4 ? 'Fair' : 'Needs Improvement';

      const refinedPrompt = `Create a ${originalPrompt.includes('React') ? 'React' : 'web'} application with the following specifications:

Technical Requirements:
- ${originalPrompt.toLowerCase().replace(/create|build|make/g, '').trim()}
- Implement responsive design using modern CSS/Tailwind
- Include proper error handling and loading states
- Follow React best practices and TypeScript conventions

Deliverables:
- Clean, maintainable component structure
- Proper state management implementation
- Basic testing setup
- Documentation for setup and usage

Please provide complete, production-ready code with comments explaining key architectural decisions.`;

      const variations = {
        concise: `Build a ${originalPrompt.includes('React') ? 'React' : 'web'} app: ${originalPrompt.toLowerCase().replace(/create|build|make/g, '').trim()}. Include TypeScript, responsive design, and error handling.`,
        creative: `Hey! Let's build something awesome together. ${originalPrompt} - but let's make it special with smooth animations, delightful micro-interactions, and a design that users will love. Think modern, clean, and user-focused.`,
        optimized: `# Task: ${originalPrompt.charAt(0).toUpperCase() + originalPrompt.slice(1)}

## Context
You are an expert full-stack developer building production-ready applications.

## Requirements
- ${originalPrompt.toLowerCase().replace(/create|build|make/g, '').trim()}
- Follow industry best practices
- Include comprehensive error handling
- Optimize for performance and accessibility

## Output Format
Provide complete code with detailed explanations for each component and architectural decision.`
      };

      const analysis: PromptAnalysis = {
        score,
        grade,
        tags,
        refinedPrompt,
        variations
      };

      setResult(analysis);

      // Save to database if user is authenticated
      if (user) {
        await supabase
          .from('prompt_history')
          .insert({
            user_id: user.id,
            original_prompt: originalPrompt,
            refined_prompt: refinedPrompt,
            score,
            tags
          });
      }

      return analysis;
    } catch (error) {
      console.error('Error analyzing prompt:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getHistory = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('prompt_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  };

  return {
    analyzePrompt,
    getHistory,
    isLoading,
    result,
    setResult
  };
};
